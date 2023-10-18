from drf_yasg import openapi


class CategorySchema(openapi.Schema):
    type = openapi.TYPE_OBJECT
    properties = {
        'name': openapi.Schema(
            type=openapi.TYPE_STRING,
            max_length=200,
        ),
    }
    required = ['name']


# Schema for the Category model
category_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(
            type=openapi.TYPE_STRING,
            max_length=200,
        ),
    },
    required=['name']
)

# Schema for the OpenTime model
open_time_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'title': openapi.Schema(
            type=openapi.TYPE_STRING,
            max_length=100,
        ),
        'sub_title': openapi.Schema(
            type=openapi.TYPE_STRING,
            max_length=255,
        ),
    },
    required=['title', 'sub_title']
)

# Schema for the Location model
location_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING, max_length=200),
        'latitude': openapi.Schema(
            type=openapi.TYPE_NUMBER,
            format=openapi.FORMAT_FLOAT,
            minimum=-90.0,
            maximum=90.0,
        ),
        'longitude': openapi.Schema(
            type=openapi.TYPE_NUMBER,
            format=openapi.FORMAT_FLOAT,
            minimum=-180.0,
            maximum=180.0,
        ),
    },
    required=['name', 'latitude', 'longitude']
)


destination_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'title': openapi.Schema(type=openapi.TYPE_STRING, max_length=200),
        'sub_title': openapi.Schema(type=openapi.TYPE_STRING, max_length=200),
        'description': openapi.Schema(type=openapi.TYPE_STRING, max_length=1000),
        'image': openapi.Schema(type=openapi.TYPE_STRING, max_length=255),
        'location': location_schema,
        'categories': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=category_schema,
        ),
        'open_time': open_time_schema,
    },
    required=['title', 'sub_title', 'description', 'image', 'location', 'categories', 'open_time']
)

# Schema for the TransportationType enum
transportation_type_enum = openapi.Schema(
    type=openapi.TYPE_STRING,
    enum=['BU', 'TR'],  # The choices for TransportationType
    description='Transportation Type (BU for Bus, TR for Train)',
)

# Schema for the PublicTransportLine model
public_transport_line_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'departure_for': openapi.Schema(
            type=openapi.TYPE_INTEGER,  # Assuming it's the ID of the related Destination
            description='ID of the Destination for departure',
        ),
        'departure_from': openapi.Schema(
            type=openapi.TYPE_STRING,
            max_length=20,
            description='Location for departure',
        ),
        'departure_time': openapi.Schema(
            type=openapi.TYPE_STRING,
            format=openapi.FORMAT_DATETIME,
            description='Departure time in HH:MM format',
        ),
        'arrival_time': openapi.Schema(
            type=openapi.TYPE_STRING,
            format=openapi.FORMAT_DATETIME,
            description='Arrival time in HH:MM format',
        ),
        'transportation_type': transportation_type_enum,
    },
    required=['departure_for', 'departure_from', 'departure_time', 'arrival_time', 'transportation_type']
)

# Weather API response schema
weather_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'coord': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'lon': openapi.Schema(type=openapi.TYPE_NUMBER),
                'lat': openapi.Schema(type=openapi.TYPE_NUMBER),
            },
        ),
        'weather': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'main': openapi.Schema(type=openapi.TYPE_STRING),
                    'description': openapi.Schema(type=openapi.TYPE_STRING),
                    'icon': openapi.Schema(type=openapi.TYPE_STRING),
                },
            ),
        ),
        'base': openapi.Schema(type=openapi.TYPE_STRING),
        'main': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'temp': openapi.Schema(type=openapi.TYPE_NUMBER),
                'feels_like': openapi.Schema(type=openapi.TYPE_NUMBER),
                'temp_min': openapi.Schema(type=openapi.TYPE_NUMBER),
                'temp_max': openapi.Schema(type=openapi.TYPE_NUMBER),
                'pressure': openapi.Schema(type=openapi.TYPE_INTEGER),
                'humidity': openapi.Schema(type=openapi.TYPE_INTEGER),
                'sea_level': openapi.Schema(type=openapi.TYPE_INTEGER),
                'grnd_level': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        'visibility': openapi.Schema(type=openapi.TYPE_INTEGER),
        'wind': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'speed': openapi.Schema(type=openapi.TYPE_NUMBER),
                'deg': openapi.Schema(type=openapi.TYPE_INTEGER),
                'gust': openapi.Schema(type=openapi.TYPE_NUMBER),
            },
        ),
        'clouds': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={'all': openapi.Schema(type=openapi.TYPE_INTEGER)},
        ),
        'dt': openapi.Schema(type=openapi.TYPE_INTEGER),
        'sys': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'sunrise': openapi.Schema(type=openapi.TYPE_INTEGER),
                'sunset': openapi.Schema(type=openapi.TYPE_INTEGER),
            },
        ),
        'timezone': openapi.Schema(type=openapi.TYPE_INTEGER),
        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
        'name': openapi.Schema(type=openapi.TYPE_STRING),
        'cod': openapi.Schema(type=openapi.TYPE_INTEGER),
    },
)

# single destination schema
get_destination_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'destination': destination_schema,
        'weather': weather_schema,
        'public_transport_schedule': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=public_transport_line_schema
        ),
        'similar_destinations': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=destination_schema,
            maxItems=3
        )
    },
    required=['destination']
)

# get all locations and categories schema
get_locations_categories_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'locations': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=location_schema
        ),
        'categories': openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=category_schema
        )
    }
)

# all destinations schema
get_all_destinations_schema = openapi.Schema(
    type=openapi.TYPE_ARRAY,
    items=destination_schema
)

# search by name or category schema
search_for_destinations_schema = openapi.Schema(
    type=openapi.TYPE_ARRAY,
    items=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'sub_title': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['title', 'sub_title']
    )
)


# closest destinations search schema
closest_destinations_schema = openapi.Schema(
    type=openapi.TYPE_ARRAY,
    items=destination_schema,
    max_items=3
)

