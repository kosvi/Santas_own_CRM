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
| [specs.md](Docs/specs.md) | Contains specs for the app. Includes latest relational models of the database and user stories that are used to decided content of sprints. |
| [spend_hours.md](Docs/spend_hours.md) | Contains sprints, time spend on each sprint, sprint goals and what else was achieved during each sprint (extras). Spend hours are recorded by individual sprints. |
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


## Enviromental variables

**server:**

.env
```
PORT=
NODE_ENV=
DATABASE_URL=
POSTGRES_SSL=
```
|Variable| Description | default |
|--------|-------------|---------|
|PORT    | Used to choose the port where the server binds. | 3001 |
|NODE_ENV| Chooses what mode is used to run the server. Options: production \| develop \| test | production |
|DATABASE_URL | Url where the database is accessible. Format: `postgres://<user>:<password>@<hostname>:<port>/<database>` | must be set |
|POSTGRES_SSL | If SSL is required to connect to database, set this to `true` | false |

`NODE_ENV` differences:
| feature | production | develop | test |
|--------|-------------|---------|------|
| `/api/reset` available | false | true | true |

**client:**

.env
```
REACT_APP_API_BASE=
HOST=
WDS_SOCKET_HOST=
```
| Variable | Description | default |
|----------|-------------|---------|
|REACT_APP_API_BASE| Used as prefix for all api-queries | - |
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

