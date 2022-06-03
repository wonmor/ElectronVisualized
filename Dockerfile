# FOR FRONT-END DEPLOYMENT... (REACT)
FROM node:16-alpine as build-step
WORKDIR /
ENV PATH /app/node_modules/.bin:$PATH
COPY client/package.json yarn.lock ./app/
COPY client/src ./app/src
COPY client/public ./app/public
WORKDIR /app
RUN yarn install
RUN yarn build

# FOR BACK-END DEPLOYMENT... (FLASK)
FROM python:3.10.4-slim
WORKDIR /
RUN apt-get update && apt-get install -y python3-dev gfortran libopenblas-dev libxc-dev libscalapack-mpi-dev libfftw3-dev
COPY requirements.txt /
RUN pip3 install -r /requirements.txt
COPY . /app
WORKDIR /app
EXPOSE 5000
CMD gunicorn electron_visualized:app