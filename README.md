# Cuisine Hunter
Angular Project with Zomato API data.

## Pre-requisites
The following should be installed in your system -
* [Node.js](https://nodejs.org/en/)
* [TypeScript](http://www.typescriptlang.org/)
  > npm install -g typescript
* [Angular](https://angular.io/)
  > npm install -g @angular/cli
* [MySQL](https://www.mysql.com)
  > npm install --save express
  > npm install --save mysql
  > npm install --save body-parser
  > npm install --save nodemon

## Creating and running the database
Open the files **\"database.ddl.sql\"** and **\"database.dml.sql\"** MySQL WorkBench.
* Run All the commands in the DDL file to create the databases.
* Run the necessary commands from the DML file to edit the records in the databases.

## Installing Dependencies for Backend
In Terminal or Command prompt, Navigate to the project folder -
> cd ./CuisineHunter/backend

Run the following commands in a new Terminal window, to start the backend -
* To install the dependencies for the Node Server
  > npm install

* To start node server on *http://localhost:1337*
  > node index.js

  or alternatively,
  > nodemon

## Installing Dependencies for App
* In Terminal or Command prompt, Navigate to the project folder -
  > cd ./CuisineHunter

* Run the following commands on Terminal or Command prompt, to install dependencies -
  > npm install

## Start App
* Run the following command on Terminal or Command prompt, to start the application -
  > npm start

* Afterwards, To see your project in action. Open your browser and enter the url - *http://localhost:4200*