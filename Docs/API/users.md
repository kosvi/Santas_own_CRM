## List all users

**Example**

GET `/api/users`
Status: 200

```
[
  {
    "id": 1,
    "username": "santa",
    "password": "santa",
    "name": "Santa Claus",
    "disabled": false,
    "createdAt": "2022-01-24T07:53:48.302Z",
    "updatedAt": "2022-01-24T07:53:48.302Z",
    "groups": [
      {
        "id": 3,
        "name": "santa"
      }
    ]
  },
  {
    "id": 4,
    "username": "admin",
    "password": "password",
    "name": "Admin Elf",
    "disabled": false,
    "createdAt": "2022-01-24T07:53:48.302Z",
    "updatedAt": "2022-01-24T07:53:48.302Z",
    "groups": [
      {
        "id": 1,
        "name": "admin"
      }
    ]
  }
]
```

## Search users

**Example**

GET `/api/users/?name=elf`
Status: 200

```
[
  {
    "id": 2,
    "username": "elf",
    "password": "elf",
    "name": "Small Elf",
    "disabled": false,
    "createdAt": "2022-01-24T07:53:48.302Z",
    "updatedAt": "2022-01-24T07:53:48.302Z",
    "groups": []
  },
  {
    "id": 4,
    "username": "admin",
    "password": "password",
    "name": "Admin Elf",
    "disabled": false,
    "createdAt": "2022-01-24T07:53:48.302Z",
    "updatedAt": "2022-01-24T07:53:48.302Z",
    "groups": [
      {
        "id": 1,
        "name": "admin"
      }
    ]
  }
]
```

**Errors**

GET `/api/users/?name=foo`
Status 404

```
{
  "error": "no users found"
}
```

## Display user by ID

**Example**

GET `/api/users/4`
Status: 200

```
{
  "id": 4,
  "username": "admin",
  "password": "password",
  "name": "Admin Elf",
  "disabled": false,
  "createdAt": "2022-01-24T07:53:48.302Z",
  "updatedAt": "2022-01-24T07:53:48.302Z",
  "groups": [
    {
      "id": 1,
      "name": "admin",
      "functionalities": [
        {
          "id": 1,
          "code": "users",
          "name": "Users",
          "permission": {
            "id": 1,
            "groupId": 1,
            "functionalityId": 1,
            "read": true,
            "write": true
          }
        },
        {
          "id": 2,
          "code": "permissions",
          "name": "Groups and permissions",
          "permission": {
            "id": 2,
            "groupId": 1,
            "functionalityId": 2,
            "read": true,
            "write": true
          }
        }
      ]
    }
  ]
}
```

**Errors**

GET `/api/users/10`
Status: 404

```
{
  "error": "no user found with id 10"
}
```

GET `/api/users/foo`
Status: 400

```
{
  "error": "Incorrect or missing number"
}
```
