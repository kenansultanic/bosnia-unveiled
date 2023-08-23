from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200, blank=False, unique=True) ##unique=true

    def __str__(self) -> str:
        return self.name


class OpenTime(models.Model):
    title = models.CharField(max_length=100, blank=False)
    sub_title = models.CharField(max_length=255, blank=False)

    def __str__(self) -> str:
        return self.title


class PublicTransportLine(models.Model):

    class TransportationType(models.TextChoices):
        BUS = 'BU', 'Bus'
        TRAIN = 'TR', 'Train'

    departure_from = models.CharField(max_length=20, blank=False)
    departure_time = models.TimeField(blank=False)
    arrival_time = models.TimeField(blank=False)
    transportation_type = models.CharField(
        max_length=2,
        choices=TransportationType.choices,
        default=TransportationType.BUS
    )



class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self) -> str:
        return f'{self.latitude}, {self.longitude}'


class Destination(models.Model):
    title = models.CharField(max_length=200, blank=False, unique=True) #unique=true
    sub_title = models.CharField(max_length=200, unique=True) #unique=true
    description = models.TextField(max_length=1000, blank=False)
    image = models.ImageField(upload_to='images/', max_length=255, blank=False)
    categories = models.ManyToManyField(Category, blank=False)
    open_time = models.ForeignKey(OpenTime, on_delete=models.CASCADE) 
    public_transport_schedules = models.ForeignKey(PublicTransportLine, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title
