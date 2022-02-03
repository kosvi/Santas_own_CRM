## Spend hours

### Setting up the project

| Date | Hours | Total Hours | Description |
|------|-------|-------------|-------------|
| 10.1.2022 | 1 | 1 | Created Github-repository and started working on documentation | 
|      | 1 | 2 | Tried to make a working typescript backend and a working test for it | 
| 11.1.2022 | 2 | 4 | Did some experiments with typescript backend, initialized react-app with typescript and setup eslint, jest and cypress. Started working on the pipeline. |
|           | 2 | 6 | Adjustments to both client and server, created `docker-compose.dev.yml` to allow easy development of the application. |
|           | 1 | 7 | Spend most of the time trying to get e2e tests to work on Github. |
|           | 1 | 8 | Worked to make tests easier to run on different environments. Begin to work on Heroku deployment. |
|           | 1 | 9 | Decided to still continue deploying to Heroku |
|           | 1 | 10| And spend too much time fighting with Cypress. For now Cypress stays in `.eslintignore` |
|           | 1 | 11| ...aaaand another hour with Heroku... |
|           | 1 | 12| Worked on to get Heroku pushes to work. |
| 12.1.2022 | 5 | 17| Managed to get Heroku work. Struggling with Typescript & Sequelize combination | 
| 13.1.2022 | 1 | 18| Realized my own stupidity and fixed migrations with fresh brains. |
|           | 2 | 20| Tinkered with database. Having ALOT of thought about giving up on typescript and going to plain JS. THIS IS INSANE! But I got migrations to work and I have an endpoint to reset & populate database (for tests). Alot of refactoring is needed soon... |
|           | 2 | 22| Try to create a working test-env (for github) |
| 14.1.2022 | 1 | 23| Tinkered with DB issues on the pipeline | 
|           | 1 | 24| Tweaked Dockerfiles and compose-file to make images lighter |
| total    |24 | 24| |

I guess we now have a more or less working development environment that is using Docker to spin up the dev-version of the software. We also have a pipeline that is doing all the tasks required from it for now. There is still some things to do with the pipeline, but for now it will allow us to start developing and trying out our product as it starts to become our MVP. 

I did have some (or alot) trouble with Typescript, but I am happy that I decided to stick with it. I am confident that once I get to work on the actual project, thing will get better. I don't consider this my first sprint. I was just setting up the tools to start the actual work. 

### Sprint 1 - database

Goals:
- ~~First version of the relation model~~
- ~~All the migration-scripts to implement it~~
- ~~`/api/reset` -endpoint to reset & populate database when `NODE_ENV=develop` or `NODE_ENV=test`~~
- ~~Refactor all the technical debt gathered so far~~
- ~~Add tests for all the code that is going to stay in the product~~

| Date | Hours | Total Hours | Description |
|------|-------|-------------|-------------|
| 14.1.2022 | 1 | 25| Spend some time updating documentation and started first sprint. |
| 15.1.2022 | 1 | 26| Planned and draw the first version of the relational model. Next up: write migrations from it. | 
|           | 2 |28| Wrote migrations and required models, relations etc. Also tested that written migrations work (= created the tables). Noticed some minor problems in the relational model, but didn't fix them in the diagram. I guess I'll be loosing my mind one day figuring why code & documentation won't match :) |
|           | 1 |29| Minor refactoring and re-structuring. Some updates to documentation and minor fixes to migrations (the part to revert them). |
| 16.1.2022 | 3 |32| Worked on populating database and get the `/api/reset` to work. Fixed some plural-issues on migrations. | 
|           | 1 |33| Kept working on resetting database and started building some tests before quitting for the day. |
| 17.1.2022 | 3 |36| Kept working on resetting the database, added some new data to populate with. Adjusted relational model and added some tests. Tweaks to pipeline. |
|           | 1 |37| Cleaned some final marks of Cypress from backend. Added version controller and wrote some tests. | 
| 18.1.2022 | 3 |40| Worked on to improve the pipeline, tweaked tests. Got reset for database to work the smart way instead of stupid way. All data is ready and we can populate database when ever we want to. | 
| sprint total    | 16 |40| |

Extras:
- Extracted Cypress in it's own folder. Hopefully this will make deployments a bit faster. 
- Added tests for `develop` branch

### Sprint 2 - controllers (without permissions yet)

Goals:
- ~~Add controllers to backend to serve data from database~~
- Add possibility to: 
  - ~~add entries~~
  - ~~add groups and permissions~~
- ~~Update documentation to reflect the state of the project~~


| Date | Hours | Total Hours| Description |
|-----|------|--------------|-------------|
| 18.1.2022 | 1 |41| Wrote `users` and `groups` routers to serve data from database. | 
|           | 1 |42| Struggled to get a single test run against controller that uses database. Still going to need whole alot of work on that! |
| 19.1.2022 | 1 |43| Re-organizing documentation |
|           | 2 |45| Banged my head against the wall with TypeScript typing when trying to write integration tests to test data returned by Api. |
|           | 1 |46| Added some stuff to groups controller, service and tests. Seems `fail()` can no longer be used in Jest. | 
| 20.1.2022 | 1 |47| Worked on groups-endpoint, it's tests and tried to make docker-setup for simple test-running. | 
|           | 1 |48| Worked on groups-endpoint, wrote some tests and made docker-compose-file to run tests in containers. |
| 21.1.2022 | 2 |50| Continued work on groups-endpoint. Also wrote some tests (for test-helpers). Next we will need tests to ensure adding new permissions work as intended. | 
| 22.1.2022 | 1 |51| Wrote middleware to handle errors on routes. | 
|           | 2 |53| Wrote final tests for groups-controller and fixed situations where user tries to post invalid permissions to a group. |
|           | 1 |54| Worked on `/api/users` (controller and service). It now allows searching by name. Also started working on tests for users-endpoint. Minor re-organizing of tests folder structure. |
| 23.1.2022 | 1 |55| Worked on tests for the `/api/users`. |
|           | 1 |56| Started working on `/api/people`, added controller, service and tests and first functionalities to them. |
| 24.1.2022 | 1 |57| Worked on api-documentation. Wrote tests for boolean validator. | 
|           | 1 |58| Found some problems from groups-endpoint while writing documentation. Added tests and fixed issues. Also wrote tests to reset-endpoint. Continued working on `/api/people`. | 
|           | 1 |59| Spend quite some time reading Sequelize documentation about relations before finally figured out how they are implemented. Spend time working on `/api/people` |
| 25.1.2022 | 2 |61| Spend time with people-endpoint: api-documentation, tests, controller, service | 
|           | 2 |63| Work started with items-endpoint | 
| 26.1.2022 | 2 |65| Finished items-endpoint, adjusted people-endpoint and minor tweaks to database reset & some additional edits. |
| 27.1.2022 | 2 |67| Entries endpoint almost finished, some updates to documentation. API-documentation almost finished (for sprint 2) |
| 28.1.2022 | 2 |69| Sprint more or less done. Found some issues on reset-service and fixes affected other services that now need minor fixes. |
| sprint total | 29 |69| | 

Extras:
- Easier testing with docker-compose
- Error handling to middleware
- Jest collects coverage reports

### Sprint 3 - authentication

Goals:
- ~~add `/api/login`~~
- ~~add `/api/logout`~~
- ~~add middleware to handle authentication~~
- *fix controllers to check permissions* **partly**

Going to leave some of the goals of the sprint to be unfulfilled. Permission checking can be added later to all the endpoints needed, but we really should move on to the frontend at this point. 

| Date | Hours | Total Hours |Description |
|------|-------|-------------|------------|
|29.1.2022 | 3 | 72 | Mostly spend time working on login. Also improved pipeline, updated documentation and tweaked docker-compose -files |
|30.1.2022 | 2 | 74 | Finished login and it's tests. Worked on middleware and tried to learn how to access properties of object typed as unknown. |
|31.1.2022 | 4 | 78 |Spend ALOT of time figuring out how to validate objects. Spend ALOT of time wondering how to access data returned by database requests. Spend ALOT of time figuring out how to async-await in the code. phew... not going to write typescript in any time soon after this project...|
|1.2.2022 | 1 | 79 | Insane work on middleware and trying to get permissions added to requests | 
|         | 1 | 80 | Worked with middleware. Permissions will become a problem in case the user is in multiple groups... |
|         | 2 | 82 | Entries endpoint now checks users permissions. Also wrote some tests and fixed code where tests started to fail after all the changes to code. |
| 2.2.2022| 1 | 83 | Worked on tests and made minor fixes to auth-middleware. Some documentation updates too. |
|         | 2 | 85 | Worked on logout, wrote/updated documentation, minor refactoring and more and more tests |
| 3.2.2022| 2 | 87 | Added logout and it's functionalities, kept documentation up-to-date and added tests. And uh... mostly banged my head against the wall with middleware-tests and never found out why it works how it works. | 
|         | 1 | 88 | Logout and users endpoints and their tests. |
|         | 1 | 89 | Added authenticate to users-endpoint and fixed tests to pass with this change. |
| sprint total | 20 | 89 | |

Extras:
- Fixed Github Actions to use docker image of Postgres 
