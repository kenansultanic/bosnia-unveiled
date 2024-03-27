# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables (you may customize these)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY . /app/

# Expose the port your Django app will run on (e.g., 8000)
EXPOSE 8000

# Specify the command to run your Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
