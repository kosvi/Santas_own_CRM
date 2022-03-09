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
{
  "id": 4,
  "name": "foo",
  "updatedAt": "2022-01-24T17:04:52.347Z",
  "createdAt": "2022-01-24T17:04:52.347Z"
}
```

**Errors**

POST `/api/groups`
```
{
  "name": "foo"
}
```

Status: 403

```
{
  "error": "Validation error: SequelizeUniqueConstraintError"
}
```

POST `/api/groups`
```
{
  "foo": "bar"
}
```

Status: 400

```
{
  "error": "Error validating group: malformed or missing name"
}
```

## Add a permission to group

**Example**

POST `/api/groups/4`
```
{
  "functionalityId": 2,
  "read": false,
  "write": false
}
```

Status: 201

```
{
  "id": 4,
  "name": "foo",
  "createdAt": "2022-01-24T17:04:52.347Z",
  "updatedAt": "2022-01-24T17:04:52.347Z",
  "functionalities": [
    {
      "id": 1,
      "code": "users",
      "name": "Users",
      "permission": {
        "read": false,
        "write": false
      }
    },
    {
      "id": 2,
      "code": "permissions",
      "name": "Groups and permissions",
      "permission": {
        "read": false,
        "write": false
      }
    }
  ]
}
```

**Errors**

POST `/api/groups/4`
```
{
  "functionalityId": 2,
  "read": false,
  "write": false
}
```

Status: 403

```
{
  "error": "this group already has permission set to this functionality"
}
```

POST `/api/groups/6`
```
{
  "functionalityId": 2,
  "read": false,
  "write": false
}
```

Status: 404

```
{
  "error": "no group found with id: 6"
}
```

POST `/api/groups/4`
```
{
  "functionalityId": 10,
  "read": false,
  "write": false
}
```

Status: 400

```
{
  "error": "no functionality exists with id: 10"
}
```

POST `/api/groups/4`
```
{
  "functionalityId": 4,
  "read": "false",
  "write": false
}
```

Status: 400

```
{
  "error": "Error validating request: malformed permission"
}
```

## Update permission of group

**Example**

PUT `/api/groups/5`
```
{
  "functionalityId": 5,
  "read": false,
  "write": false
}
```

Status: 200
```
{
  "id": 5,
  "name": "testGroup",
  "createdAt": "2022-02-20T18:57:02.367Z",
  "updatedAt": "2022-02-20T18:57:02.367Z",
  "functionalities": [
    {
      "id": 2,
      "code": "permissions",
      "name": "Groups and permissions",
      "permission": {
        "read": false,
        "write": false
      }
    },
    {
      "id": 5,
      "code": "entries",
      "name": "Entries to person",
      "permission": {
        "read": false,
        "write": false
      }
    }
  ]
}
```

## List all functionalities

**Example**

GET `/api/groups/functionalities`
Status: 200

```
[
  {
    "id": 1,
    "code": "users",
    "name": "Users"
  },
  {
    "id": 2,
    "code": "permissions",
    "name": "Groups and permissions"
  },
  {
    "id": 3,
    "code": "people",
    "name": "People"
  },
  {
    "id": 4,
    "code": "wishes_and_items",
    "name": "Wishes and items"
  },
  {
    "id": 5,
    "code": "entries",
    "name": "Entries to person"
  }
]
```

## Connect user to group

**Example**

POST `/api/groups/connect`
```
{
  "groupId": 4,
  "userId": 18
}
```
Status: 201
```
  "id": 13,
  "userId": 18,
  "groupId": 4
}
```

## Delete group

**Example**

DELETE `/api/groups/7`
Status 204

**Errors**

DELETE `/api/groups/7`
Status 404