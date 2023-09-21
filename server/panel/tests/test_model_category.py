from django.test import TestCase

from panel.models import Category

class CategoryModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
       Category.objects.create(name="Tuzla")

    def test_name_label(self):
        category = Category.objects.get(id=1)
        field_label = category._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_max_length(self):
        category = Category.objects.get(id=1)
        max_length = category._meta.get_field('name').max_length
        self.assertEqual(max_length,200)

    def test_name_blank(self):
        category = Category.objects.get(id=1)
        blank = category._meta.get_field('name').blank
        self.assertEqual(blank, False)

    def test_name_unique(self):
        category = Category.objects.get(id=1)
        unique = category._meta.get_field('name').unique
        self.assertEqual(unique,True)

