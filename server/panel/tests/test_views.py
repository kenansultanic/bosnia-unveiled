from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from unittest.mock import patch, Mock

from panel.models import Category, Location, OpenTime, Destination, PublicTransportLine

location1 = Location.objects.create(
    name="Test location",
    latitude=43.145,
    longitude=18.345,
)

location2 = Location.objects.create(
    name="Test location",
    latitude=43.245,
    longitude=18.305,
)

open_time = OpenTime.objects.create(
    title='Test',
    sub_title='test'
)


class GetAllDestinationsTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.location_1 = Location.objects.create(
            name="Test location",
            latitude=43.145,
            longitude=18.345,
        )
        self.location_2 = Location.objects.create(
            name="Test location",
            latitude=43.045,
            longitude=18.375,
        )
        self.open_time = OpenTime.objects.create(
            title='Test',
            sub_title='test'
        )
        self.destination_1 = Destination.objects.create(
            title="Destination 1",
            sub_title="Destination Subtitle 1",
            description="Description 1",
            image="image1.jpg",
            location=self.location_1,
            open_time=self.open_time,
        )
        self.destination_2 = Destination.objects.create(
            title="Destination 2",
            sub_title="Destination Subtitle 2",
            description="Description 2",
            image="image2.jpg",
            location=self.location_2,
            open_time=self.open_time,
        )

    def test_get_all_destinations(self):

        response = self.client.get('/destinations/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data), 2)

        self.assertEqual(response.data[0]['title'], "Destination 1")
        self.assertEqual(response.data[1]['title'], "Destination 2")


class DestinationViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.location = Location.objects.create(
            name="Test location",
            latitude=43.045,
            longitude=18.375,
        )
        self.open_time = OpenTime.objects.create(
            title='Test',
            sub_title='test'
        )
        self.destination = Destination.objects.create(
            title="Destination 1",
            sub_title="Destination Subtitle 1",
            description="Description 1",
            image="image1.jpg",
            location=self.location,
            open_time=self.open_time,
        )

    @patch('panel.views.requests.get')
    def test_get_destination(self, mock_request):

        url = reverse('get-destination', kwargs={'destination_id': self.destination.id})

        mock_response = Mock()
        json_data = {'weather_data': 'mock data'}

        mock_response.status_code = 200
        mock_response.json.return_value = json_data
        mock_request.return_value = mock_response

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('destination', response.data)
        self.assertIn('weather', response.data)
        self.assertIn('public_transport_schedule', response.data)
        self.assertIn('similar_destinations', response.data)

    def test_get_destination_invalid_id(self):
        url = reverse('get-destination', kwargs={'destination_id': 9999})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class SearchDestinationsViewTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.location_1 = Location.objects.create(
            name="Test location",
            latitude=43.145,
            longitude=18.345,
        )
        self.location_2 = Location.objects.create(
            name="Test location",
            latitude=43.045,
            longitude=18.375,
        )
        self.open_time = OpenTime.objects.create(
            title='Test',
            sub_title='test'
        )
        self.destination_1 = Destination.objects.create(
            title="Destination 1",
            sub_title="Destination Subtitle 1",
            description="Description 1",
            image="image1.jpg",
            location=self.location_1,
            open_time=self.open_time,
        )
        self.destination_2 = Destination.objects.create(
            title="Destination 2",
            sub_title="Destination Subtitle 2",
            description="Description 2",
            image="image2.jpg",
            location=self.location_2,
            open_time=self.open_time,
        )

    def test_search_destinations(self):
        url = reverse('search-destinations')

        response = self.client.get(url, {'query': 'Destination'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Test with a query that doesn't match any destinations
        response = self.client.get(url, {'query': 'Nonexistent'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_search_destinations_no_query(self):
        url = reverse('search-destinations')

        # Test without a query parameter
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # self.assertEqual(len(response.data), 0)
        self.assertIn('error', response.data)


class FindClosestDestinationsViewTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.location = Location.objects.create(
            name="Test location",
            latitude=43.143,
            longitude=18.347,
        )
        self.location_1 = Location.objects.create(
            name="Destination 1 location",
            latitude=43.145,
            longitude=18.345,
        )
        self.location_2 = Location.objects.create(
            name="Destination 2 location",
            latitude=43.045,
            longitude=18.375,
        )
        self.open_time = OpenTime.objects.create(
            title='Test',
            sub_title='test'
        )
        self.category_1 = Category.objects.create(name="Category 1")
        self.category_2 = Category.objects.create(name="Category 2")
        self.destination_1 = Destination.objects.create(
            title="Destination 1",
            sub_title="Destination Subtitle 1",
            description="Description 1",
            image="image1.jpg",
            location=self.location_1,
            open_time=self.open_time,
        )
        self.destination_2 = Destination.objects.create(
            title="Destination 2",
            sub_title="Destination Subtitle 2",
            description="Description 2",
            image="image2.jpg",
            location=self.location_2,
            open_time=self.open_time,
        )
        self.destination_1.categories.add(self.category_1)
        self.destination_2.categories.add(self.category_2)

    def test_find_closest_destinations(self):

        url = reverse('closest-destinations')

        # Test with valid parameters
        response = self.client.get(url, {'location_id': self.location.id, 'categories': 'Category 1', 'distance': 100})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('closest_destinations', response.data)
        self.assertEqual(len(response.data['closest_destinations']), 1)  # Expecting 1 result

        # Test with invalid location ID
        response = self.client.get(url, {'location_id': 9999, 'categories': 'Category 1', 'distance': 100})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
