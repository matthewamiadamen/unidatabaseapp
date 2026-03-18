FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

#RUN apt-get update && apt install gcc -y && apt-get install build-essential -y && apt-get install python3-dev -y
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /code/

ENV PORT=8000
EXPOSE 8000
CMD ["sh", "-c", "python manage.py migrate && gunicorn restexample.wsgi:application --bind 0.0.0.0:${PORT}"]