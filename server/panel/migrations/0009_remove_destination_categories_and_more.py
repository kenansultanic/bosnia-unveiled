# Generated by Django 4.2.4 on 2023-08-24 10:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0008_alter_destination_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='destination',
            name='categories',
        ),
        migrations.RemoveField(
            model_name='destination',
            name='location',
        ),
        migrations.RemoveField(
            model_name='destination',
            name='open_time',
        ),
        migrations.RemoveField(
            model_name='destination',
            name='public_transport_schedules',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Destination',
        ),
        migrations.DeleteModel(
            name='Location',
        ),
        migrations.DeleteModel(
            name='OpenTime',
        ),
        migrations.DeleteModel(
            name='PublicTransportLine',
        ),
    ]