from django.urls import path
from . import views

urlpatterns = [
    path('destination/<int:destination_id>/', views.get_destination, name="one destination"),
    path('destinations/', views.get_all_destinations, name="all destinations"),
    path('destinations/search/', views.search_destinations, name="search destinations"),
    path('destinations/search/2', views.find_closest_destinations, name="closest destinations"),
]
