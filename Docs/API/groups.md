## List all groups

**Example**

GET `/api/groups` 
Status: 200

```
[
  {
    "id": 1,
    "name": "admin",
    "createdAt": "2022-01-24T07:53:48.312Z",
    "updatedAt": "2022-01-24T07:53:48.312Z",
    "functionalities": [
      {
        "id": 1,
        "code": "users",
        "name": "Users",
        "permission": {
          "read": true,
          "write": true
        }
      },
      {
        "id": 2,
        "code": "permissions",
        "name": "Groups and permissions",
        "permission": {
          "read": true,
          "write": true
        }
      }
    ]
  },
  {
    "id": 3,
    "name": "santa",
    "createdAt": "2022-01-24T07:53:48.312Z",
    "updatedAt": "2022-01-24T07:53:48.312Z",
    "functionalities": []
  }
]
```

## Show single group

**Example**

GET `/api/groups/admin`
Status: 200

```
{
  "id": 1,
  "name": "admin",
  "createdAt": "2022-01-24T07:53:48.312Z",
  "updatedAt": "2022-01-24T07:53:48.312Z",
  "functionalities": [
    {
      "id": 1,
      "code": "users",
      "name": "Users",
      "permission": {
        "read": true,
        "write": true
      }
    },
    {
      "id": 2,
      "code": "permissions",
      "name": "Groups and permissions",
      "permission": {
        "read": true,
        "write": true
      }
    }
  ]
}
```

**Errors**

GET `/api/groups/foobar`
Status: 404

```
{
  "error": "foobar was not found"
}
```

## Post new group

**Example** 

POST `/api/groups`
```
{
  "name": "foo"
}
```

Status: 201

```
Example of result
```

## Add a permission to group

**Example**

POST `/api/groups/3`
```
{
  "functionalityId": 1,
  "read": false,
  "write": false
}
```

Status: 201

```
Example of result
```
