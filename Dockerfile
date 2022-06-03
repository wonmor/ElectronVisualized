# FOR FRONT-END DEPLOYMENT... (REACT)
FROM node:16-alpine as build-step
WORKDIR /
ENV PATH /app/client/node_modules/.bin:$PATH
RUN mkdir ./app
COPY yarn.lock ./app
COPY client ./app
WORKDIR /app/client
RUN yarn install
RUN yarn build

# FOR BACK-END DEPLOYMENT... (FLASK)
FROM python:3.10.4-slim
WORKDIR /
RUN apt-get update && apt-get install -y python3-dev gfortran libopenblas-dev libxc-dev libscalapack-mpi-dev libfftw3-dev
COPY requirements.txt /
RUN pip3 install -r /requirements.txt
# Pretty much pass everything in the root folder except for the client folder, as we do NOT want to overwrite the pre-generated client folder that is already in the ./app folder
COPY electron_visualized.py .flaskenv ./app/
COPY server ./app/server
WORKDIR /app
EXPOSE 5000
CMD gunicorn electron_visualized:app