# Clubhouse Dashboard
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Express Generator

## To start

Clone the repo and in the project directory, you can run:

### `yarn install && yarn build && yarn start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

# Features

1. API Caching
2. Sorting and searching of table by name
3. 1 min auto refresh

# System design implementations

Projects - To avoid having to query team names and members one by one, brought the list in memory to a dictionary which could be queried much faster

API caching to reduce server workload

# Outstanding issues

Currently, images are fetched on the frontend by appending Clubhouse_API_TOKEN to the url. This could prove to be an issue if the dashboard is viewed outside the company.

Styling issue where sorting carats are superimposed on headers

Tests that check if the API is up and running