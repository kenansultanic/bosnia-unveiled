from django.db import models
#from django.contrib.gis.db import models as geoModels
#from ckeditor.fields import RichTextField


class Category(models.Model):
    name: models.CharField(max_length=200, blank=False) ##unique=true

    def __str__(self):
        return self.name


class OpenTime(models.Model):
    title = models.CharField(max_length=100, blank=False)
    sub_title = models.CharField(max_length=255, blank=False)

    def __str__(self):
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


class Destination(models.Model):
    title = models.CharField(max_length=200, blank=False) #unique=true
    sub_title = models.CharField(max_length=200) #unique=true
    description = models.TextField(max_length=1000, blank=False)
    #location = geoModels.PointField(name='POINT(LON LAT)', blank=False)
    image = models.ImageField(upload_to='images/', max_length=255, blank=False)
    categories = models.ManyToManyField(Category, blank=False)
    open_time = models.ForeignKey(OpenTime, on_delete=models.CASCADE)
    public_transport_schedules = models.ForeignKey(PublicTransportLine, on_delete=models.CASCADE)
    #description = RichTextField()

    def __str__(self):
        return self.title


