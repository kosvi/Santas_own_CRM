# Api documentation

## Users

|Description |URL | Method | Functionality |Access | Success | Possible errors | 
|------------|----|--------|--------------|---------|-----------------|-----------|
|[List all users](API/users.md#list-all-users) | `/api/users` | GET | users |read | 200 | - |
|[Search users](API/users.md#search-users) | `/api/users?name=<key>` | GET | users |read | 200 | 404 |
|[Display user by ID](API/users.md#display-user-by-id) | `/api/users/:id` | GET | users |read | 200 | 400, 404 |
|[Disable user](API/users.md#disable-user) | `/api/users/disable/:id` | PUT | users | write | 200 | 400, 404, 500 |
|[Enable user](API/users.md#enable-user) | `/api/users/enable/:id` | PUT | users | write | 200 | 400, 404, 500 |
|[Add new user](API/users.md#add-new-user)| `/api/users` |POST | users | write | 201 | 400, 500 | 
|[Update password](API/users.md#update-password)|`/api/users/:id`|PUT | users* | write | 204 | 404, 500|

&ast; or if `:id` is the id of current user

## Groups

|Description |URL       |Method         | Functionality  |Access | Success | Possible errors |
|---------|----------|---------------| -------| -----------------|-----------|-----------------|
|[List all groups](API/groups.md#list-all-groups)|`/api/groups` | GET       | permissions |read | 200 | -  |
|[Show single group](API/groups.md#show-single-group)|`/api/groups/:name`| GET | permissions|read | 200 | 404 |
|[Post new group](API/groups.md#post-new-group)|`/api/groups` | POST | permissions |write | 201 | 400, 403, 500(?) |
|[Add a permission to group](API/groups.md#add-a-permission-to-group) | `/api/groups/:groupId` | POST | permissions |write | 201 | 400, 403, 404, 500(?) |
|[Update permission of group](API/groups.md#update-permission-of-group)|`/api/groups/:groupId`|PUT|permissions| write|200| - |
|[List all functionalities](API/groups.md#list-all-functionalities)|`/api/groups/functionalities`|GET |permissions|read|200 |- |

## People

|Description | URL | Method | Functionality |Access | Success | Possible errors |
|------------|-----|--------|---------------|-------|---------|-----------|
|[GET /api/people](API/people.md#get-base)|`/api/people`|GET | people |read | - | 400 |
|[Search people by name](API/people.md#search-people-by-name) | `/api/people/?name=<key>?` | GET | people |read | 200 | - |
|[Display single person with wishes](API/people.md#display-single-person-with-wishes) | `/api/people/:id` | GET | people |read | 200 | 400, 404, 500(?) |
|[Add new person](API/people.md#add-new-person)|`/api/people`|POST | people |write | 201, 400, 500|
|[Update person](API/peopel.md#update-person)|`/api/people/:id` |PUT | people |write | 200, 400, 404, 500 |

## Items

|Description|URL |Method | Functionality | Access | Success | Possible errors |
|-----------|----|-------|---------------|--------|---------|-----------|
|[List items by popularity](API/items.md#list-items-by-popularity)|`/api/items` or `/api/items/?limit=<number>`|GET | wishes_and_items |read | 200 | 400 |

## Entries

|Description | URL |Method | Functionality| Access | Success | Possible errors|
|------------|-----|-------|--------------|--------|----------------|-----------|
|[Get latest entries](API/entries.md#get-latest-entries)|`/api/entries` or `/api/entries/?limit=<number>`| GET | entries |read | 200 | - |
|[Add new entry](API/entries.md#add-new-entry)|`/api/entries`| POST | entries | write | 201 | 400|

## Wishes

|Description | URL |Method | Functionality| Access | Success | Possible errors|
|------------|-----|-------|--------------|--------|----------------|-----------|
|[Add new wish](API/wishes.md#add-new-wish)|`/api/wishes`|POST |wishes_and_items| write | 201 | 400, 404, 500 |

## Login

|Description | URL | Method | Functionality | Access | Success | Possible errors |
|------------|-----|-------|---------|--------------|----------|-----------|
|[Login](API/login.md#login)|`/api/login`|POST | - | - | 200 | 400, 401, 403, 500 |


## Logout

| Description| URL|Method | Functionality | Access|Success | Possible errors|
|------------|----|-------|---------------|-------|--------|----------------|
|[Logout current user](API/logout.md#logout-current-user)|`/api/logout`|DELETE| - | - | 200 | - |
|[Logout single session](API/logout.md#logout-single-session)|`/api/logout/session/:token`|DELETE | users | write | 204 | 404 |
|[Delete sessions from user](API/logout.md#delete-sessions-from-user)|`/api/logout/user/:id`|DELETE | users | write | 200 | 400 |

## Reset

This endpoint is only available in dev/test -modes. 

| Description| URL|Method | Functionality | Access|Success | Possible errors|
|------------|----|-------|---------------|-------|--------|----------------|
|clear db | `/api/reset/clear` | DELETE | - | - | 204 | - |
| populate db | `/api/reset/populate` | POST | - | - | 201 | - |
|[clear & populate db](API/reset.md#reset-and-re-populate-database) | `/api/reset/full` | POST | - | - | 200 | - |
