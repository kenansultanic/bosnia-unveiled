from django.test import TestCase

from panel.models import Location, OpenTime, Destination, PublicTransportLine


class PublicTransportLineModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        location = Location.objects.create(
            name="Test location",
            latitude=43.245,
            longitude=18.345,
        )
        open_time = OpenTime.objects.create(
            title='Test',
            sub_title='test'
        )
        destination = Destination.objects.create(
            title="Your Destination Title",
            sub_title="Your Subtitle",
            description="Your Description",
            image="path_to_your_image.jpg",
            location=location,
            open_time=open_time,
        )

        PublicTransportLine.objects.create(
            departure_for=destination,
            departure_from='Konjic',
            departure_time='10:00',
            arrival_time='11:00',
            transportation_type='BU'
        )

    def test_departure_for_label(self):
        transport = PublicTransportLine.objects.get(id=1)
        field_departure_for = transport._meta.get_field('departure_for').verbose_name
        self.assertEqual(field_departure_for, 'departure for')

    def test_departure_from_label(self):
        transport = PublicTransportLine.objects.get(id=1)
        field_departure_from = transport._meta.get_field('departure_from').verbose_name
        self.assertEqual(field_departure_from, 'departure from')

    def test_departure_from_max_length(self):
        transport = PublicTransportLine.objects.get(id=1)
        max_length = transport._meta.get_field('departure_from').max_length
        self.assertEqual(max_length, 20)

    def test_departure_from_blank(self):
        transport = PublicTransportLine.objects.get(id=1)
        blank = transport._meta.get_field('departure_from').blank
        self.assertEqual(blank, False)

    def test_departure_time_label(self):
        transport = PublicTransportLine.objects.get(id=1)
        field_departure_time = transport._meta.get_field('departure_time').verbose_name
        self.assertEqual(field_departure_time, 'departure time')

    def test_departure_time_blank(self):
        transport = PublicTransportLine.objects.get(id=1)
        blank = transport._meta.get_field('departure_time').blank
        self.assertEqual(blank, False)

    def test_arrival_time_label(self):
        transport = PublicTransportLine.objects.get(id=1)
        field_arrival_time = transport._meta.get_field('arrival_time').verbose_name
        self.assertEqual(field_arrival_time, 'arrival time')

    def test_arrival_time_blank(self):
        transport = PublicTransportLine.objects.get(id=1)
        blank = transport._meta.get_field('arrival_time').blank
        self.assertEqual(blank, False)

    def test_transport_type_max_length(self):
        transport = PublicTransportLine.objects.get(id=1)
        max_length = transport._meta.get_field('transportation_type').max_length
        self.assertEqual(max_length, 2)
