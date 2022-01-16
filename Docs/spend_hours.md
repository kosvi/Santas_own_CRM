## Spend hours

### Setting up the project

| Date | Hours | Description |
|------|-------|-------------|
| 10.1.2022 | 1 | Created Github-repository and started working on documentation |
|      | 1 | Tried to make a working typescript backend and a working test for it |
| 11.1.2022 | 2 | Did some experiments with typescript backend, initialized react-app with typescript and setup eslint, jest and cypress. Started working on the pipeline. |
|           | 2 | Adjustments to both client and server, created `docker-compose.dev.yml` to allow easy development of the application. |
|           | 1 | Spend most of the time trying to get e2e tests to work on Github. |
|           | 1 | Worked to make tests easier to run on different environments. Begin to work on Heroku deployment. |
|           | 1 | Decided to still continue deploying to Heroku |
|           | 1 | And spend too much time fighting with Cypress. For now Cypress stays in `.eslintignore` |
|           | 1 | ...aaaand another hour with Heroku... |
|           | 1 | Worked on to get Heroku pushes to work. |
| 12.1.2022 | 5 | Managed to get Heroku work. Struggling with Typescript & Sequelize combination | 
| 13.1.2022 | 1 | Realized my own stupidity and fixed migrations with fresh brains. |
|           | 2 | Tinkered with database. Having ALOT of thought about giving up on typescript and going to plain JS. THIS IS INSANE! But I got migrations to work and I have an endpoint to reset & populate database (for tests). Alot of refactoring is needed soon... |
|           | 2 | Try to create a working test-env (for github) |
| 14.1.2022 | 1 | Tinkered with DB issues on the pipeline | 
|           | 1 | Tweaked Dockerfiles and compose-file to make images lighter |
| total.    |24 | |

I guess we now have a more or less working development environment that is using Docker to spin up the dev-version of the software. We also have a pipeline that is doing all the tasks required from it for now. There is still some things to do with the pipeline, but for now it will allow us to start developing and trying out our product as it starts to become our MVP. 

I did have some (or alot) trouble with Typescript, but I am happy that I decided to stick with it. I am confident that once I get to work on the actual project, thing will get better. I don't consider this my first sprint. I was just setting up the tools to start the actual work. 

### Sprint 1 - database

Goals:
- ~~First version of the relation model~~
- ~~All the migration-scripts to implement it~~
- `/api/reset` -endpoint to reset & populate database when `NODE_ENV=develop` or `NODE_ENV=test`
- Refactor all the technical debt gathered so far
- Add tests for all the code that is going to stay in the product

| Date | Hours | Description |
|------|-------|-------------|
| 14.1.2022 | 1 | Spend some time updating documentation and started first sprint. |
| 15.1.2022 | 1 | Planned and draw the first version of the relational model. Next up: write migrations from it. | 
|           | 2 | Wrote migrations and required models, relations etc. Also tested that written migrations work (= created the tables). Noticed some minor problems in the relational model, but didn't fix them in the diagram. I guess I'll be loosing my mind one day figuring why code & documentation won't match :) |
|           | 1 | Minor refactoring and re-structuring. Some updates to documentation and minor fixes to migrations (the part to revert them). |
| 16.1.2022 | 3 | Worked on populating database and get the `/api/reset` to work. Fixed some plural-issues on migrations. | 
|           | 1 | Kept working on resetting database and started building some tests before quitting for the day. |
