from django.urls import path
from . import views

urlpatterns = [
    path('destinations/', views.get_all_destinations, name="all-destinations"),
    path('destination/<int:destination_id>/', views.get_destination, name="get-destination"),
    path('destinations/search/', views.search_destinations, name="search-destinations"),
    path('destinations/closest', views.find_closest_destinations, name="closest-destinations"),
]
