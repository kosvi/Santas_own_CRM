# Api documentation

## Users

|Description |URL | Method | Success | Possible errors | 
|------------|----|--------|---------|-----------------|
|[API/users.md#list-all-users](List all users) | `/api/users` | GET | 200 | - |
|[API/users.md#search-users](Search users) | `/api/users?name=<key>` | GET | 200 | - |
|[API/users.md#display-user-by-id](Display user by ID) | `/api/users/:id` | GET | 200 | 400, 404 |

## Groups

|Description |URL       |Method         | Success | Possible errors |
|---------|----------|---------------| -------| -----------------|
|List all groups|`/api/groups` | GET       | 200 | -  |
|Show single group|`/api/groups/:name`| GET | 200 | 404 |
|Post new group|`/api/groups` | POST | 201 | 400, 500(?) |
|Add a permission to group | `/api/groups/:groupId` | POST | 201 | 400, 404, 500(?) |
