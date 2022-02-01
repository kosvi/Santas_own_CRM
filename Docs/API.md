# Api documentation

## Users

|Description |URL | Method | Access | Success | Possible errors | 
|------------|----|--------|---------|-----------------|-----------|
|[List all users](API/users.md#list-all-users) | `/api/users` | GET | read | 200 | - |
|[Search users](API/users.md#search-users) | `/api/users?name=<key>` | GET | read | 200 | 404 |
|[Display user by ID](API/users.md#display-user-by-id) | `/api/users/:id` | GET | read | 200 | 400, 404 |

## Groups

|Description |URL       |Method         | Access | Success | Possible errors |
|---------|----------|---------------| -------| -----------------|-----------|
|[List all groups](API/groups.md#list-all-groups)|`/api/groups` | GET       | read | 200 | -  |
|[Show single group](API/groups.md#show-single-group)|`/api/groups/:name`| GET | read | 200 | 404 |
|[Post new group](API/groups.md#post-new-group)|`/api/groups` | POST | write | 201 | 400, 403, 500(?) |
|[Add a permission to group](API/groups.md#add-a-permission-to-group) | `/api/groups/:groupId` | POST | write | 201 | 400, 403, 404, 500(?) |

## People

|Description | URL | Method | Access | Success | Possible errors |
|------------|-----|--------|---------|-----------------|-----------|
|[GET /api/people](API/people.md#get-base)|`/api/people`|GET | read | - | 400 |
|[Search people by name](API/people.md#search-people-by-name) | `/api/people/?name=<key>?` | GET | read | 200 | - |
|[Display single person with wishes](API/people.md#display-single-person-with-wishes) | `/api/people/:id` | GET | read | 200 | 400, 404, 500(?) |

## Items

|Description|URL |Method | Access | Success | Possible errors |
|-----------|----|-------|---------|-----------------|-----------|
|[List items by popularity](API/items.md#list-items-by-popularity)|`/api/items` or `/api/items/?limit=<number>`|GET | read | 200 | 400 |

## Entries

|Description | URL |Method | Access | Success | Possible errors|
|------------|-----|-------|---------|----------------|-----------|
|[Get latest entries](API/entries.md#get-latest-entries)|`/api/entries` or `/api/entries/?limit=<number>`| GET | read | 200 | - |
|[Add new entry](API/entries.md#add-new-entry)|`/api/entries`| POST | write | 201 | 400|

## Login

|Description | URL | Method | Access | Success | Possible errors |
|------------|-----|-------|---------|----------------|-----------|
|[Login](API/login.md#login)|`/api/login`|POST | - | 200 | 400, 401, 403, 500 |
