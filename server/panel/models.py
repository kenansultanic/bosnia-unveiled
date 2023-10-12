from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    name = models.CharField(max_length=200, blank=False, unique=True)  # unique=true

    def __str__(self) -> str:
        return self.name

    def to_dict(self):
        return {
            'name': self.name
        }


class OpenTime(models.Model):
    title = models.CharField(max_length=100, blank=False)
    sub_title = models.CharField(max_length=255, blank=False)

    def __str__(self) -> str:
        return self.title

    def to_dict(self):
        return {
            'title': self.title,
            'sub_title': self.sub_title
        }


class Location(models.Model):
    name = models.CharField(max_length=200)  # add blank=False
    latitude = models.FloatField(
        blank=False,
        validators=[
            MinValueValidator(limit_value=-90.0, message="Latitude must be greater than or equal to -90.0"),
            MaxValueValidator(limit_value=90.0, message="Latitude must be less than or equal to 90.0")
        ]
    )
    longitude = models.FloatField(
        blank=False,
        validators=[
            MinValueValidator(limit_value=-180.0, message="Longitude must be greater than or equal to -180.0"),
            MaxValueValidator(limit_value=180.0, message="Longitude must be less than or equal to 180.0")
        ]
    )

    def __str__(self) -> str:
        return f'{self.name} - {self.latitude}, {self.longitude}'

    def to_dict(self):
        return {
            'latitude': self.latitude,
            'longitude': self.longitude
        }


class Destination(models.Model):
    title = models.CharField(max_length=200, blank=False, unique=True)  # unique=true
    sub_title = models.CharField(max_length=200, unique=True)  # unique=true
    description = models.TextField(max_length=1000, blank=False)
    image = models.ImageField(upload_to='images/', max_length=255, blank=False)
    location = models.OneToOneField(Location, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category, blank=False)
    open_time = models.ForeignKey(OpenTime, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title

    def to_dict(self, request):
        serialized_destination = {
            'id': self.pk,
            'title': self.title,
            'sub_title': self.sub_title,
            'description': self.description,
            'image': self.get_image_url(request),
            'location': self.location.to_dict() if self.location else None,
            'open_time': self.open_time.to_dict() if self.open_time else None,
        }
        categories_list = list(self.categories.values_list('name', flat=True))
        serialized_destination['categories'] = categories_list
        return serialized_destination

    def get_image_url(self, request):
        if self.image:
            return request.build_absolute_uri(self.image.url)
        return None


class PublicTransportLine(models.Model):

    class TransportationType(models.TextChoices):
        BUS = 'BU', 'Bus'
        TRAIN = 'TR', 'Train'

    departure_for = models.ForeignKey('Destination', related_name='departures', on_delete=models.CASCADE)
    departure_from = models.CharField(max_length=20, blank=False)
    departure_time = models.TimeField(blank=False)
    arrival_time = models.TimeField(blank=False)
    transportation_type = models.CharField(
        max_length=2,
        choices=TransportationType.choices,
        default=TransportationType.BUS
    )

    def __str__(self) -> str:
        return f'{self.departure_for} - {self.departure_from} ({self.departure_time}), {self.get_transportation_type_display()}'

    def to_dict(self):
        return {
            'departure_for': self.departure_for,
            'departure_from': self.departure_from,
            'departure_time': self.departure_time,
            'arrival_time': self.arrival_time,
            'transportation_type': self.transportation_type
        }
