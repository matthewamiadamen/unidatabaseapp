# Sample university rest api 

Backend:
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![venv](https://img.shields.io/badge/venv-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://docs.python.org/3/library/venv.html)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django%20REST%20Framework](https://img.shields.io/badge/Django%20REST%20Framework-A30000?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)

Frontend:
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React%20Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Tailwind%20CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer%20Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Data, Docs, and Tooling:
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![ReDoc](https://img.shields.io/badge/ReDoc-8B5CF6?style=for-the-badge)](https://redocly.com/redoc/)

Deployment:
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)


This is a sample rest api using DjangoRestFramework for a university. 
It contains the models 

* Students
* Degrees
* Cohorts
* Modules 
* Grades


The system has been populated with dummy data from the file `/university/management/commands/seed.py`
To clear the database and rebuild with fresh random data use 
```shell
python manage.py seed
```

> Warning this command can take some time to run, it populates a lot of data

The superuser details are:
 
```text
username: admin
password: testing123456
```

## Running the app

### Installing required libraries
Clone the repo

Install all required modules by running `pip install -r requirements.txt`





### Running the server

To run the server type

```shell
python manage.py runserver
```

This will then run on your own machine at `http://127.0.0.1:8000`

### Docker 
If you have [Docker installed](https://docs.docker.com/get-docker/) have a [DockerHub account](https://hub.docker.com/) you can download a docker image of this app by typing

```shell
docker pull scrineymvm/ca298restassignment:latest
```

To then start the image in a container run
```shell
docker run -p 8000:8000 --name ca298restassignment scrineymvm/ca298restassignment:latest
```

Then you can go to [http://localhost:8000](http://localhost:8000) to view the running instance

## URLs
The homepage will take you straight to an interactive [swagger](https://swagger.io/) interface

* `/api` will take you to the standard django rest framework api page
* `/api/schema/redoc/` will take you to an interactive [redoc](https://redocly.com/) page for the api
* `/api/schema/` will allow you to download the `schema.yml` to import into other tools such as postman


### A note on Cors
This app has allowed `localhost:3000` through for CORS, if you need additional ports add them in `restexample/settings.py` 
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", # node on port 3000
    "http://127.0.0.1:3000"  # node on port 3000
]
```
