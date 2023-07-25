# API Documentation

## Required Libraries
### Commands to execute BEFORE RUNNING
npm install express mysql cors --save  

## Description
This GitHub API documentation provides an overview of the Application-Server repository, specifically focusing on the structure and contents within the ```/app``` folder. The app folder contains four sub-folders: ```/config```, ```/controllers```, ```/models```, and ```/routes```. Each sub-folder serves a specific purpose in the application's backend architecture.

#### ```/config```
The ```db.config.js``` file located within the ```config``` folder contains configuration settings for the application's database connection. It exports a JSON object with four properties, each a component of information required to establish a connection to the database.

#### ```/controllers```
The controllers are responsible for connecting the routes to the models. They act as a liaison between the HTTP requests and the responses from the backend. There are six controller files: ```education```, ```fauna_survey```, ```flora```, ```flora_survey```, ```flora_survey_species```, and ```organism```. Each file has the suffix ```.controller.js```.

#### ```/models```
The models are a representation of the columns of the tables that contain the data entries. The model also acts as the rules that control access and modification of data stored in the database. There are six model files with the same names as the controller files. Each file has the suffix ```.model.js```.

#### ```/routes```
Each route file is responsible for handling HTTP requests and responses related to specific entities in the application. The routes interact with the corresponding models to perform standard actions, including creating, getting, updating, and deleting data. There are six route files with the same names as the controller files. Each file has the suffix ```.routes.js```.
