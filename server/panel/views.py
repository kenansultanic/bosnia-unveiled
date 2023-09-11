from django.core import serializers
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Destination, PublicTransportLine
from dotenv import load_dotenv
import os
import requests

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
    public_transport_schedule = destination.departures.all()

    latitude = destination.location.latitude
    longitude = destination.location.longitude

    # use /forecast for 5-day forecast
    api_url = f'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={WEATHER_API_KEY}'
    response = requests.request('get', api_url)

    if response.status_code == 200:
        print('response.json()')

    serialized_destination = {
        'id': destination.pk,
        'title': destination.title,
        'sub_title': destination.sub_title,
        'description': destination.description,
        'image': request.build_absolute_uri(destination.image.url) if destination.image else None,
        'location': destination.location.to_dict() if destination.location else None,
        'open_time': destination.open_time.to_dict() if destination.open_time else None,
        # 'public_transport_schedule': destination.public_transport_schedules.to_dict() if destination.public_transport_schedules else None,
        # 'public_transport_schedule': public_transport_schedule,
        'weather': response.json()
    }

    # kad je many to many
    categories_list = list(destination.categories.values_list('name', flat=True))
    serialized_destination['categories'] = categories_list

    return JsonResponse(serialized_destination)
