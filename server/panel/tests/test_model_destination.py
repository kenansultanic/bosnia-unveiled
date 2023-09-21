from django.test import TestCase

from panel.models import Location, OpenTime, Destination


class DestinationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        location = Location.objects.create(
            name="Test location",
            latitude=43.245,
            longitude=18.345,
        )
        open_time = OpenTime.objects.create(
            title='Testno',
            sub_title='testic'
        )
        Destination.objects.create(
           title='Janjski otoci',
           sub_title='Sipovo',
           description='lorem ipsum',
           image = "path_to_your_image.jpg",
           location=location,
           open_time=open_time,
       )
    def test_title_label(self):
        destination = Destination.objects.get(id=1)
        field_sub_title = destination._meta.get_field('title').verbose_name
        self.assertEqual(field_sub_title,'title')

    def test_title_max_length(self):
        destination = Destination.objects.get(id=1)
        max_length = destination._meta.get_field('title').max_length
        self.assertEqual(max_length,200)

    def test_title_blank(self):
        destination = Destination.objects.get(id=1)
        blank = destination._meta.get_field('title').blank
        self.assertEqual(blank,False)
    def test_title_unique(self):
        destination = Destination.objects.get(id=1)
        unique = destination._meta.get_field('title').unique
        self.assertEqual(unique,True)

    def test_sub_title_label(self):
        destination = Destination.objects.get(id=1)
        field_sub_title = destination._meta.get_field('sub_title').verbose_name
        self.assertEqual(field_sub_title,'sub title')

    def test_sub_title_max_length(self):
        destination = Destination.objects.get(id=1)
        max_length = destination._meta.get_field('sub_title').max_length
        self.assertEqual(max_length,200)

    def test_sub_title_unique(self):
        destination = Destination.objects.get(id=1)
        unique = destination._meta.get_field('sub_title').unique
        self.assertEqual(unique,True)

    def test_description_label(self):
        destination = Destination.objects.get(id=1)
        field_description = destination._meta.get_field('description').verbose_name
        self.assertEqual(field_description,'description')

    def test_description_max_length(self):
        destination = Destination.objects.get(id=1)
        max_length = destination._meta.get_field('description').max_length
        self.assertEqual(max_length,1000)

    def test_description_blank(self):
        destination = Destination.objects.get(id=1)
        blank = destination._meta.get_field('description').blank
        self.assertEqual(blank,False)
