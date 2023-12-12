from django.urls import path
from . import views

urlpatterns = [
    path('locations-and-categories/', views.get_all_categories_and_locations, name="all-locations-and-categories"),
    path('destinations/', views.get_all_destinations, name="all-destinations"),
    path('destination/<int:destination_id>/', views.get_destination, name="get-destination"),
    path('destinations/search/', views.search_destinations, name="search-destinations"),
    path('destinations/closest', views.find_closest_destinations, name="closest-destinations"),
    path('destinations/random/<int:number_of_destinations>/', views.random_destinations, name="random-destinations"),
]
