# Api documentation

## Users

|Description |URL | Method | Success | Possible errors | 
|------------|----|--------|---------|-----------------|
|[List all users](API/users.md#list-all-users) | `/api/users` | GET | 200 | - |
|[Search users](API/users.md#search-users) | `/api/users?name=<key>` | GET | 200 | - |
|[Display user by ID](API/users.md#display-user-by-id) | `/api/users/:id` | GET | 200 | 400, 404 |

## Groups

|Description |URL       |Method         | Success | Possible errors |
|---------|----------|---------------| -------| -----------------|
|[List all groups](API/groups.md#list-all-groups)|`/api/groups` | GET       | 200 | -  |
|[Show single group](API/groups.md#show-single-group)|`/api/groups/:name`| GET | 200 | 404 |
|[Post new group](API/groups.md#post-new-group)|`/api/groups` | POST | 201 | 400, 500(?) |
|[Add a permission to group](API/groups.md#add-a-permission-to-group) | `/api/groups/:groupId` | POST | 201 | 400, 404, 500(?) |
