from django.contrib import admin

from .models import Category, Destination

admin.site.register(Category),
admin.site.register(Destination)