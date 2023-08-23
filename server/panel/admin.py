from django.contrib import admin

from .models import Destination, Category, OpenTime, PublicTransportLine

admin.site.register(Destination)
admin.site.register(Category)
admin.site.register(OpenTime)
admin.site.register(PublicTransportLine)