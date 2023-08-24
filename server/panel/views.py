from django.core import serializers
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Destination


def index(request):
    return HttpResponse("Hello, world. You're at the panel index.")


@api_view(['GET'])
def getAllDestionations(request):
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
def getDestionation(request, destination_id):
    destination = Destination.objects.get(pk=destination_id)

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

    # kad je many to many
    categories_list = list(destination.categories.values_list('name', flat=True))
    serialized_destination['categories'] = categories_list

    return JsonResponse(serialized_destination)



