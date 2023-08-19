from django.urls import path

from . import views

urlpatterns = [
    #path("", views.index, name="index"),
    path('destination/<int:destination_id>/',views.getDestionation,name="jedna destinacija"),
    path('destinations/',views.getAllDestionations,name="sve destinacije"),
]