from django.urls import path

from . import views

urlpatterns = [
    #path("", views.index, name="index"),
    path('destination/<int:destination_id>/', views.get_destination, name="jedna destinacija"),
    path('destinations/', views.get_all_destinations, name="sve destinacije"),
]