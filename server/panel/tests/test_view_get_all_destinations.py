from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase

from panel.models import Category, Location, OpenTime, Destination, PublicTransportLine


class GetAllDestinationsTest(TestCase):
    def setUp(self):
        location1 = Location.objects.create(
            name="Test location",
            latitude=43.245,
            longitude=18.345,
        )
        location2 = Location.objects.create(
            name="Test location",
            latitude=43.245,
            longitude=18.345,
        )
        open_time = OpenTime.objects.create(
            title='Testno',
            sub_title='testic'
        )

        self.dest1 = Destination.objects.create(
            title="Destination 1",
            sub_title="Subtitle 1",
            description="Description 1",
            image="image1.jpg",
            location=location1,
            open_time=open_time,
        )
        self.dest2 = Destination.objects.create(
            title="Destination 2",
            sub_title="Subtitle 2",
            description="Description 2",
            image="image2.jpg",
            location=location2,
            open_time=open_time,
        )

        self.client = APIClient()

    def test_get_all_destinations(self):

        response = self.client.get('/destinations/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 2)

        self.assertEqual(response.data[0]['title'], "Destination 1")
        self.assertEqual(response.data[1]['title'], "Destination 2")

