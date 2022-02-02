## Reset and re-populate database

This endpoint will clear the database, set id's t start from 1 and re-populate the database with default data. 

POST `/api/reset/full` 

No payload needed. No authentication needed. 

#### Results

This is the most important default data:

**Users**

| Name | Username | Password | disabled | Group(s) | 
|------|----------|----------|----------|----------|
|Santa Claus | santa | santa | false | santa |
|Small Elf | elf | elf | false | scout|
|Admin Elf | admin | password | false | admin |
|Someone Without Group | nobody | nobody | false | - |
|Mickey Mouse | mickey | mouse | true | - |

**Groups**

Permissions are set same for ALL endpoints

| Name | read | write |
|------|------|-------|
| santa | true | false |
| scout | false | false |
| admin | true | true |
| empty | not set | not set |

**People**

Every person has minimum of 1 item in wishlist and maximum of 10 wishes (all default items). Wishes are randomized. 
All wishes have the same description: "I want it to be lovely!"

|Name | Birthdate | Address |
|-----|-----------|---------|
|Mikko Mallikas | 2014/10/15 | Mikonkatu 12 |
|Maija Mallikas | 2012/6/30 | Mikonkatu 12 |
|Jane Doe | 2015/1/20 | Somestreet 313 |

