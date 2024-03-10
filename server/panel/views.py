from django.shortcuts import get_object_or_404
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING, TYPE_NUMBER, TYPE_ARRAY, TYPE_INTEGER, Items, Schema
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Destination, Location, Category
from django.db.models import Count
from dotenv import load_dotenv
import os
import requests
from django.db.models import Q
from geopy.distance import geodesic
from panel.pagination import DestinationsPagination

from .schemas import get_destination_schema, search_for_destinations_schema, get_all_destinations_schema, \
    closest_destinations_schema, get_locations_categories_schema, random_destinations_schema

load_dotenv()

WEATHER_API_KEY = os.getenv('OPENWEATHERMAP_API_KEY')


@swagger_auto_schema(method='get', responses={200: get_locations_categories_schema})
@api_view(['GET'])
def get_all_categories_and_locations(request):
    """
        Returns all categories and locations saved in the database
    """
    locations = Location.objects.all()
    categories = Category.objects.all()

    parsed_locations = [location.to_dict() for location in locations]
    parsed_categories = [category.to_dict() for category in categories]

    return Response({'locations': parsed_locations, 'categories': parsed_categories})


page_param = Parameter('page', IN_QUERY, description='Page number', type=TYPE_INTEGER)
per_page_param = Parameter('per_page', IN_QUERY, description='Number of destinations per page', type=TYPE_INTEGER)


@swagger_auto_schema(
    method='get',
    manual_parameters=[page_param, per_page_param],
    responses={200: get_all_destinations_schema}
)
@api_view(['GET'])
def get_all_destinations(request):
    """
        Returns all destinations from the database. Implemented with pagination
    """
    destinations = Destination.objects.all()
    paginator = DestinationsPagination()
    result_page = paginator.paginate_queryset(destinations, request)
    serialized_destinations = [destination.to_dict(request) for destination in result_page]

    return paginator.get_paginated_response(serialized_destinations)


@swagger_auto_schema(
    method='get',
    responses={
        200: get_destination_schema,
        404: 'Destination with that ID does not exit',
        500: 'Error message'
    }
)
@api_view(['GET'])
def get_destination(request, destination_id):
    """
        Gets destination based on it's ID, a weather forecast for the area, a public transport schedule
        (if defined) and 3 most similar destinations based on the count of shared categories
    """
    try:
        destination = Destination.objects.get(pk=destination_id)
        all_destinations = Destination.objects.exclude(id=destination_id)
        public_transport_schedule = destination.departures.all()
        images = destination.images.all()

        latitude = destination.location.latitude
        longitude = destination.location.longitude

        # use /forecast for 5-day forecast
        api_url = f'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={WEATHER_API_KEY}'
        api_response = requests.get(api_url)

        similar_destinations = all_destinations.annotate(
            common_category_count=Count('categories', filter=Q(categories__in=destination.categories.all()))
        ).order_by('-common_category_count')[:3]

        serialized_destination = destination.to_dict(request)
        serialized_similar_destinations = []

        for destination in similar_destinations:
            serialized_similar_destinations.append(destination.to_dict(request))

        serialized_transport_schedule = [
            {
                'departure_for': schedule.departure_for.title,
                'departure_from': schedule.departure_from,
                'departure_time': schedule.departure_time.strftime('%H:%M:%S'),
                'arrival_time': schedule.arrival_time.strftime('%H:%M:%S'),
                'transportation_type': schedule.get_transportation_type_display(),
            }
            for schedule in public_transport_schedule
        ]

        serialized_images = []

        for image in images:
            serialized_images.append(image.to_dict(request))

        response = {
            'destination': serialized_destination,
            'weather': api_response.json() if api_response.status_code == 200 else None,
            'public_transport_schedule': serialized_transport_schedule,
            'similar_destinations': serialized_similar_destinations,
            'images': serialized_images
        }

        return Response(response)

    except Destination.DoesNotExist:
        return Response({'message': 'Destination with that ID does not exit'}, status=404)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


query_param = Parameter('query', IN_QUERY, description="String to search by", type=TYPE_STRING, required=True)


@swagger_auto_schema(method='get', manual_parameters=[query_param], responses={200: search_for_destinations_schema})
@api_view(['GET'])
def search_destinations(request):
    """
        Search for destination based on a query parameter
    """
    query = request.GET.get('query')

    if not query:
        return Response({'error': 'Missing query parameter'}, status=400)

    results = Destination.objects.filter(Q(title__contains=query) | Q(categories__name__contains=query))
    data = [{'id': item.id, 'title': item.title, 'sub_title': item.sub_title} for item in results]

    return Response(data)


location_id = Parameter('location_id', IN_QUERY, description='Selected location ID', type=TYPE_INTEGER, required=True)
max_distance = Parameter('distance', IN_QUERY, description='Maximum distance from location', type=TYPE_NUMBER,
                         required=True)
search_categories = Parameter(
    'categories',
    IN_QUERY,
    description='Categories to search by',
    type=TYPE_ARRAY,
    items=Items(type=TYPE_STRING)
)


@swagger_auto_schema(
    method='get',
    manual_parameters=[location_id, max_distance, search_categories],
    responses={
        200: closest_destinations_schema,
        404: 'Location or category not found'
    }
)
@api_view(['GET'])
def find_closest_destinations(request):
    """
        Returns closest destinations based on a max distance relative to a specific location and matching categories
    """
    selected_location_id = int(request.GET.get('location_id'))
    categories = request.GET.get('categories', '')
    categories = categories.split(',')
    distance = int(request.GET.get('distance'))

    try:
        selected_location = Location.objects.get(pk=selected_location_id)
        destinations = []

        if len(categories) > 1 or categories[0]:
            destinations = Destination.objects.filter(Q(categories__name__in=categories))
        else:
            destinations = Destination.objects.all()

        closest_destinations = filter(lambda dest: geodesic(
            (selected_location.latitude, selected_location.longitude),
            (dest.location.latitude, dest.location.longitude)
        ).kilometers < distance, destinations)

        serialized_destinations = []
        for destination in closest_destinations:
            serialized_destination = destination.to_dict(request)
            categories_list = list(destination.categories.values_list('name', flat=True))
            serialized_destination['categories'] = categories_list

            serialized_destinations.append(serialized_destination)

        return Response({'closest_destinations': serialized_destinations})

    except (Location.DoesNotExist, Category.DoesNotExist):
        return Response({'message': 'Location or category not found'}, status=400)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@swagger_auto_schema(method='get', responses={200: random_destinations_schema})
@api_view(['GET'])
def random_destinations(request, number_of_destinations):
    """
        Returns a specified number of destinations randomly
    """
    destinations = Destination.objects.order_by('?')[:number_of_destinations]

    serialized_destinations = [destination.to_dict(request) for destination in destinations]

    return Response(serialized_destinations)
