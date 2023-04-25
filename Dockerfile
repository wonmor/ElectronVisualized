# FOR FRONT-END DEPLOYMENT... (REACT)
FROM node:16-alpine as build-step

ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_FIREBASE_MEASUREMENT_ID

ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ENV REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID
ENV REACT_APP_FIREBASE_MEASUREMENT_ID=$REACT_APP_FIREBASE_MEASUREMENT_ID

WORKDIR /app
ENV PATH /app/client/node_modules/.bin:$PATH
COPY client ./client
WORKDIR /app/client
RUN npm install --force
RUN npm run build

# FOR BACK-END DEPLOYMENT... (FLASK)
FROM python:3.10.4-slim
WORKDIR /
# Don't forget "--from"! It acts as a bridge that connects two seperate stages
COPY --from=build-step app ./app
WORKDIR /app
RUN apt-get update && apt-get install -y python3-dev gfortran libopenblas-dev libxc-dev libscalapack-mpi-dev libfftw3-dev cmake
COPY requirements.txt ./
RUN pip3 install -r ./requirements.txt
# Pretty much pass everything in the root folder except for the client folder, as we do NOT want to overwrite the pre-generated client folder that is already in the ./app folder
COPY electron_visualized.py .flaskenv ./
COPY server ./server
EXPOSE 8080
ENTRYPOINT ["python"]
CMD ["electron_visualized.py"]

# THIS IS CALLED MULTI-STAGE BUILDING IN DOCKER
# HOW TO PERSIST THE DATABASE.DB WHEN DOCKER BUILDING...
# https://docs.docker.com/get-started/05_persisting_data/
# FOR CAPROVER... https://caprover.com/docs/persistent-apps.html