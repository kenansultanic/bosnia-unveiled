from django.test import TestCase

from panel.models import Category, Location, OpenTime, Destination, PublicTransportLine


class OpenTimeModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        OpenTime.objects.create(title='open', sub_title='24h')

    def test_title_label(self):
        open_time = OpenTime.objects.get(id=1)
        field_title = open_time._meta.get_field('title').verbose_name
        self.assertEqual(field_title, 'title')

    def test_title_max_length(self):
        open_time = OpenTime.objects.get(id=1)
        max_length = open_time._meta.get_field('title').max_length
        self.assertEqual(max_length, 100)

    def test_title_blank(self):
        open_time = OpenTime.objects.get(id=1)
        blank = open_time._meta.get_field('title').blank
        self.assertEqual(blank, False)

    def test_sub_title_label(self):
        open_time = OpenTime.objects.get(id=1)
        field_sub_title = open_time._meta.get_field('sub_title').verbose_name
        self.assertEqual(field_sub_title, 'sub title')

    def test_sub_title_max_length(self):
        open_time = OpenTime.objects.get(id=1)
        max_length = open_time._meta.get_field('sub_title').max_length
        self.assertEqual(max_length, 255)

    def test_sub_title_blank(self):
        open_time = OpenTime.objects.get(id=1)
        blank = open_time._meta.get_field('sub_title').blank
        self.assertEqual(blank, False)
