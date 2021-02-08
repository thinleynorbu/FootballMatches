# Football Scores

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

To run the project.

### `yarn install`

To install related dependencies.


This project uses json-server as a database. All the CRUD operation is done using this json-server. 
To change the port of the json-server. Go to `json-server.json` file and the port there. Learn more about json-server here.

https://www.npmjs.com/package/json-server

One can view the database data from `db.json` file. 

To run the json-server locally:

- Update the baseURL in api.ts file to `http://localhost:8000`

- Run command to start the server `json-server --watch db.json `


