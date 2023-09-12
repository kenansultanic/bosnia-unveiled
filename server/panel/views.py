import json
from cmath import asin, sqrt

from django.core import serializers
from django.db.models.functions import Sin, Cos, Radians
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Destination, Location, Category
from django.db.models import Q, F, Count, ExpressionWrapper, FloatField
from dotenv import load_dotenv
import os
import requests
from django.http import JsonResponse
from django.db.models import Q
from geopy.distance import geodesic

load_dotenv()

WEATHER_API_KEY = os.getenv('OPENWEATHERMAP_API_KEY')


def index(request):
    return HttpResponse("Hello, world. You're at the panel index.")


@api_view(['GET'])
def get_all_destinations(request):

    destinations = Destination.objects.all()

    serialized_destinations = []
    for destination in destinations:
        serialized_destination = {
            'id': destination.pk,
            'title': destination.title,
            'sub_title': destination.sub_title,
            'description': destination.description,
            'image': request.build_absolute_uri(destination.image.url) if destination.image else None,
            'location': destination.location.to_dict() if destination.location else None,
            'open_time': destination.open_time.to_dict() if destination.open_time else None,
            'public_transport_schedules': destination.public_transport_schedules.to_dict() if destination.public_transport_schedules else None
        }
        categories_list = list(destination.categories.values_list('name', flat=True))
        serialized_destination['categories'] = categories_list

        serialized_destinations.append(serialized_destination)

    return JsonResponse(serialized_destinations, safe=False)


@api_view(['GET'])
def get_destination(request, destination_id):

    destination = Destination.objects.get(pk=destination_id)
    all_destinations = Destination.objects.exclude(id=destination_id)
    public_transport_schedule = destination.departures.all()

    latitude = destination.location.latitude
    longitude = destination.location.longitude

    # use /forecast for 5-day forecast
    api_url = f'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={WEATHER_API_KEY}'
    response = requests.request('get', api_url)

    similar_destinations = all_destinations.annotate(
        common_category_count=Count('categories', filter=Q(categories__in=destination.categories.all()))
    ).order_by('-common_category_count')[:3]

    if response.status_code == 200:
        print('response.json()')

    serialized_similar_destinations = []

    for destination in similar_destinations:
        serialized_destination = {
            'id': destination.pk,
            'title': destination.title,
            'sub_title': destination.sub_title,
            'description': destination.description,
            'image': request.build_absolute_uri(destination.image.url) if destination.image else None,
            'location': destination.location.to_dict() if destination.location else None,
            'open_time': destination.open_time.to_dict() if destination.open_time else None,
            #'public_transport_schedules': destination.public_transport_schedules.to_dict() if destination.public_transport_schedules else None
        }
        categories_list = list(destination.categories.values_list('name', flat=True))
        serialized_destination['categories'] = categories_list

        serialized_similar_destinations.append(serialized_destination)

    serialized_destination = {
        'id': destination.pk,
        'title': destination.title,
        'sub_title': destination.sub_title,
        'description': destination.description,
        'image': request.build_absolute_uri(destination.image.url) if destination.image else None,
        'location': destination.location.to_dict() if destination.location else None,
        'open_time': destination.open_time.to_dict() if destination.open_time else None,
        'weather': response.json(),
        'similar_destinations': serialized_similar_destinations
    }

    categories_list = list(destination.categories.values_list('name', flat=True))
    serialized_destination['categories'] = categories_list

    transport_schedule = serializers.serialize('json', list(public_transport_schedule), fields=(
    'departure_for', 'departure_from', 'departure_time', 'arrival_time', 'transportation_type'))
    serialized_destination['public_transport_schedule'] = json.loads(transport_schedule)

    return JsonResponse(serialized_destination)


@api_view(['GET'])
def search_destinations(request):

    query = request.GET.get('query', '')

    results = Destination.objects.filter(Q(title__contains=query) | Q(categories__name__contains=query))
    data = [{'title': item.title, 'sub_title': item.sub_title} for item in results]

    return JsonResponse(data, safe=False)


# @api_view(['GET'])
# def find_closest_destinations(request):
#     # spasim id od lokacije koju je korisnik izabrao
#     selected_location_id = int(request.GET.get('selected_location_id'))
#     # i onda nadjem tu lokaciju
#     selected_location = Location.objects.get(pk=selected_location_id)
#
#     selected_category_id = int(request.GET.get('selected_category_id'))
#     selected_category = Category.objects.get(pk=selected_category_id)
#
#     destinations = Destination.objects.filter(Q(categories__name__in=[selected_category]))
#     #udaljenost sto izabere korisnik
#     max_distance_km = 1000
#
#
#     # racuna najblizu destinaciju
#     closest_destinations = destinations
#     return JsonResponse(closest_destinations, safe=False)


@api_view(['GET'])
def find_closest_destinations(request):
    # Parse request parameters
    selected_location_id = int(request.GET.get('selected_location_id'))
    categories = request.GET.get('categories','')
    categories = categories.split(',')
    distance = int(request.GET.get('distance'))

    try:
        # Retrieve the selected location and category objects
        selected_location = Location.objects.get(pk=selected_location_id)
        #selected_category = Category.objects.filter(Q())

        # Filter destinations by category
        destinations = Destination.objects.filter(Q(categories__name__in=categories))

        # def foo(dest):
        #     x = geodesic(
        #     (selected_location.latitude, selected_location.longitude),
        #     (dest.location.latitude, dest.location.longitude)
        # ).kilometers
        #     print(x)
        #     return x < distance
       # Calculate distances and sort destinations by distance
        closest_destinations = filter(lambda dest: geodesic(
            (selected_location.latitude, selected_location.longitude),
            (dest.location.latitude, dest.location.longitude)
        ).kilometers < distance , destinations)

        serialized_destinations = []
        for destination in closest_destinations :
            serialized_destination = {
                'title': destination.title,
                'sub_title': destination.sub_title,
                'description': destination.description,
                'image': request.build_absolute_uri(destination.image.url) if destination.image else None,
                'location': destination.location.to_dict() if destination.location else None,
                'open_time': destination.open_time.to_dict() if destination.open_time else None,
            }
            categories_list = list(destination.categories.values_list('name', flat=True))
            serialized_destination['categories'] = categories_list

            serialized_destinations.append(serialized_destination)
        return JsonResponse({'closest_destinations': serialized_destinations}, safe=False)

    except (Location.DoesNotExist, Category.DoesNotExist):
        return JsonResponse({'error': 'Location or category not found'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
