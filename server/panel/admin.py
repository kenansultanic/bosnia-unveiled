from django.contrib import admin

from .models import Destination, Category, OpenTime, PublicTransportLine, Location

admin.site.register(Destination)
admin.site.register(Category)
admin.site.register(OpenTime)
admin.site.register(PublicTransportLine)
admin.site.register(Location)