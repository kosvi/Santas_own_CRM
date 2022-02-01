# Api documentation

## Users

|Description |URL | Method | Success | Possible errors | 
|------------|----|--------|---------|-----------------|
|[List all users](API/users.md#list-all-users) | `/api/users` | GET | 200 | - |
|[Search users](API/users.md#search-users) | `/api/users?name=<key>` | GET | 200 | 404 |
|[Display user by ID](API/users.md#display-user-by-id) | `/api/users/:id` | GET | 200 | 400, 404 |

## Groups

|Description |URL       |Method         | Success | Possible errors |
|---------|----------|---------------| -------| -----------------|
|[List all groups](API/groups.md#list-all-groups)|`/api/groups` | GET       | 200 | -  |
|[Show single group](API/groups.md#show-single-group)|`/api/groups/:name`| GET | 200 | 404 |
|[Post new group](API/groups.md#post-new-group)|`/api/groups` | POST | 201 | 400, 403, 500(?) |
|[Add a permission to group](API/groups.md#add-a-permission-to-group) | `/api/groups/:groupId` | POST | 201 | 400, 403, 404, 500(?) |

## People

|Description | URL | Method | Success | Possible errors |
|------------|-----|--------|---------|-----------------|
|[GET /api/people](API/people.md#get-base)|`/api/people`|GET | - | 400 |
|[Search people by name](API/people.md#search-people-by-name) | `/api/people/?name=<key>?` | GET | 200 | - |
|[Display single person with wishes](API/people.md#display-single-person-with-wishes) | `/api/people/:id` | GET | 200 | 400, 404, 500(?) |

## Items

|Description|URL |Method | Success | Possible errors |
|-----------|----|-------|---------|-----------------|
|[List items by popularity](API/items.md#list-items-by-popularity)|`/api/items` or `/api/items/?limit=<number>`|GET | 200 | 400 |

## Entries

|Description | URL |Method | Success | Possible errors|
|------------|-----|-------|---------|----------------|
|[Get latest entries](API/entries.md#get-latest-entries)|`/api/entries` or `/api/entries/?limit=<number>`| GET | 200 | - |
|[Add new entry](API/entries.md#add-new-entry)|`/api/entries`| POST | 201 | |

## Login

|Description | URL | Method | Success | Possible errors |
|------------|-----|-------|---------|----------------|
|[Login](API/login.md#login)|`/api/login`|POST | 200 | 400, 401, 403, 500 |
