from django.core import serializers
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import Destination


def index(request):
    return HttpResponse("Hello, world. You're at the panel index.")


@api_view(['GET'])
def getAllDestionations(request):
    list_of_destionations = Destination.objects.all()
    res = serializers.serialize('json',list_of_destionations)

    data = []
    for destionation in serializers.deserialize('json',res):
        fields = destionation.object
        data.append({
            'id': fields.pk,
            'name': fields.name,
            'description': fields.description
        })
    return JsonResponse(data, safe=False)


@api_view(['GET'])
def getDestionation(request, destination_id):
    destination = Destination.objects.get(pk=destination_id)
    res = serializers.serialize('json',[destination, ])

    data = []
    for destination1 in serializers.deserialize('json',res):
        fields = destination1.object
        data.append({
            'id': fields.pk,
            'name': fields.name,
            'description': fields.description
        })
    return JsonResponse(data, safe=False)