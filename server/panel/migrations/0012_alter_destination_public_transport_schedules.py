# Generated by Django 4.2.4 on 2023-09-09 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0011_location_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='public_transport_schedules',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='panel.publictransportline'),
        ),
    ]