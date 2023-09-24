from django.core.exceptions import ValidationError
from django.test import TestCase

from panel.models import Location


class LocationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Location.objects.create(name='Sarajevo', latitude=43.8563, longitude=18.4131)

    def test_name_label(self):
        location = Location.objects.get(id=1)
        field_name = location._meta.get_field('name').verbose_name
        self.assertEqual(field_name, 'name')

    def test_name_max_length(self):
        location = Location.objects.get(id=1)
        max_length = location._meta.get_field('name').max_length
        self.assertEqual(max_length, 200)

    def test_invalid_latitude_less_than_minimum(self):
        location = Location(name="Invalid Location", latitude=-91.0, longitude=0.0)
        with self.assertRaises(ValidationError) as context:
            location.full_clean()
        self.assertIn("Latitude must be greater than or equal to -90.0", str(context.exception))

    def test_invalid_latitude_greater_than_maximum(self):
        location = Location(name="Invalid Location", latitude=91.0, longitude=0.0)
        with self.assertRaises(ValidationError) as context:
            location.full_clean()
        self.assertIn("Latitude must be less than or equal to 90.0", str(context.exception))

    def test_latitude_blank(self):
        location = Location.objects.get(id=1)
        blank = location._meta.get_field('latitude').blank
        self.assertEqual(blank, False)

    def test_invalid_longitude_less_than_minimum(self):
        location = Location(name="Invalid Location", latitude=0.0, longitude=-181.0)
        with self.assertRaises(ValidationError) as context:
            location.full_clean()
        self.assertIn("Longitude must be greater than or equal to -180.0", str(context.exception))

    def test_invalid_longitude_greater_than_maximum(self):
        location = Location(name="Invalid Location", latitude=0.0, longitude=181.0)
        with self.assertRaises(ValidationError) as context:
            location.full_clean()
        self.assertIn("Longitude must be less than or equal to 180.0", str(context.exception))

    def test_longitude_blank(self):
        location = Location.objects.get(id=1)
        blank = location._meta.get_field('longitude').blank
        self.assertEqual(blank, False)
