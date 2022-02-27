# Santa's own CRM

## Contents

- [Description](#description)
- [Repository](#repository)
- [Testing](#testing)
- [Running the app](#running-the-app)
- [Enviromental variables](#enviromental-variables)

## Description

This repository contains a customer relationship manager for Santa. It was written as an [Full Stack Open project](https://github.com/FullStack-HY/misc/blob/main/harjoitustyo.md) as a part of [Full Stack Open -course](https://fullstackopen.com/). A course held by University of Helsinki. This project is mostly to showcase my skills with Node.js and React. As I have no previous experience on building full stack -apps, planning of this app is mostly guided by my uncertainty. 

**Other documents**
| document | description |
|----------|-------------|
| [API.md](Docs/API.md)| API documentation |
| [specs.md](Docs/specs.md) | Contains specs for the app. Includes latest relational models of the database and user stories that are used to decided content of sprints. |
| [spend_hours.md](Docs/spend_hours.md) | Contains sprints, time spend on each sprint, sprint goals and what else was achieved during each sprint (extras). Spend hours are recorded by individual sprints. |
| [guide.md](Docs/guide.md) | Contains a guide on how to use the app (once it's running). |
| [personal_notes.md](Docs/personal_notes.md) | Personal notes that might be useful again during later development. |

## Repository

This repository contains three directories: [server](server), [client](client) and [e2e](e2e). They contain the following code for this project:

- server:
  - contains the api-code and is capable to serve compiled frontend
- client:
  - contains the frontend code and can be compiled and served by the backend
- e2e:
  - contains e2e tests written using Cypress

```
[master] this is the production version - it's update trough pull requests from [release]
-> [release] this is a release candidate that has passed all the tests. It will automaticly be deployed to Heroku for live demo
  -> [develop] this branch is where I develop the project or where feature-branches are merger. Once working, it can be merged to [release]
    -> [feature-branches] new features will be developed in their own brances and merged to [develop] once ready for it. 
```

## Testing

Testing includes Unit-tests, integration tests and end-to-end tests. We also use Eslint to enhance code readability.

Automatic tests by branches:
- master
  - lint, unit-tests, integration-tests, e2e-tests
- release
  - lint, unit-tests, integration-tests, e2e-tests
- develop
  - lint, unit/integration-tests

**server:**

Tests include unit-tests for functions used around application and integration tests that concentrate on testing api-functionality. I will not write separate tests for services, since controllers rely on services and testing services would basically just lead to douple-testing them. 

## Running the app

Latest Release candidate is running in [Heroku](https://glacial-shore-58496.herokuapp.com/). It's running with the following configuration:

```
NODE_ENV=develop
```

#### Dev-mode

Requirements:
- Docker
- Docker-Compose

Clone the repository and run `npm install --prefix server` and `npm install --prefix client` in repository root. After all dependencies are installed, you can start the app in development mode by running command `docker-compose -f docker-compose.dev.yml up`. Modifications to server and client force them to reload automatically. App can be accessed from `http://localhost:3000`. 

#### Tests

Requirements:
- Docker
- Docker-compose

Clone repository and run `npm install --prefix server` and `npm install --prefix client` in repository root. After dependencies are installed, you can start tests by running command `docker-compose -f test.docker-compose.yml up`. This will run unit and integration tests on the backend and frontend. You'll see the list of passed tests in the console. 

To run e2e tests, do the following: `npm install --prefix server` and `npm install --prefix client`. Run `docker-compose -f e2e.docker-compose.yml up`. Once App is running, you can run run command `npm run cypress:open` inside folder `e2e` and you'll see Cypress window with list of e2e-tests. You can run individual tests by choosing the test. To run all tests on console run command `npm run e2e` inside `e2e` folder. 

#### Production

Requirements:
- Docker
Recommends:
- Docker-compose

We recommend to download [docker-compose.yml](docker-compose.yml) and use it as base for running the server. You can adjust postgres settings by choosing different username & password and different path for database in 'volumes' section of docker-compose.yml. Also choose a valid SECRET in Santas CRM environment. It is used to sign tokens, so it should be long enough to be safe. Also make sure DATABASE_URL matches your postgres settings. Finally choose the port you want to use for running the app. For more options in enviromental variables, take a look at [enviromental variables](#enviromental-variables) section. 

Once `docker-compose.yml` is configured, run it with command: `docker-compose up`

## Enviromental variables

**server:**

.env
```
PORT=
NODE_ENV=
DATABASE_URL=
POSTGRES_SSL=
SECRET=
```
|Variable| Description | default |
|--------|-------------|---------|
|PORT    | Used to choose the port where the server binds. | 3001 |
|NODE_ENV| Chooses what mode is used to run the server. Options: production \| develop \| test | production |
|DATABASE_URL | Url where the database is accessible. Format: `postgres://<user>:<password>@<hostname>:<port>/<database>` | **must be set** |
|POSTGRES_SSL | If SSL is required to connect to database, set this to `true` | false |
|SECRET | Used for signing JWT. | **must be set** |

`NODE_ENV` differences:
| feature | production | develop | test |
|--------|-------------|---------|------|
| `/api/reset` available | false | true | true |
| `logger` logs to console | false | true | false |
| Sequelize logs sql-queries to console | false | true | false |
| Umzug logs migrations to console | false | true | false |
| Umzug allows reverting migrations | false | true | true |

Check [Api documentation](Docs/API/reset.md) for `/api/reset` for more information. It will give more information about default data that can be used for writing tests etc. 

**client:**

.env
```
REACT_APP_API_BASE=
REACT_APP_LOGGING=
REACT_APP_NOTIFICATION_DELAY=
REACT_APP_FAKED_API_DELAY=
HOST=
WDS_SOCKET_HOST=
```
| Variable | Description | default |
|----------|-------------|---------|
|REACT_APP_API_BASE| Used as prefix for all api-queries | `/api` |
|REACT_APP_LOGGING| Defines if logging is enabled or not | false |
|REACT_APP_NOTIFICATION_DELAY| Defines the time a notification is displayed in milliseconds | 5000 |
|REACT_APP_FAKED_API_DELAY | This would have no place in real production product. But it can be used to showcase caching. | 0 |
|HOST | Needed when app is run in docker-compose while developing | - |
|WDS_SOCKET_HOST | Needed when app is run in docker-compose while developing | - |

**e2e:**

.env
```
CYPRESS_WEB_BASE=
```
| Variable | Description | default |
|---------|-------------|-------|
|CYPRESS_WEB_BASE| Used as base url when making requests to app during tests. | - |

