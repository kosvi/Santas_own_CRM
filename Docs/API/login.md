## Login

**Example**

POST `/api/login`
```
{
  "username": "santa",
  "password": "santa"
}
```

Status: 200

```
{
  "username": "santa",
  "name": "Santa Claus",
  "id": 1,
  "activeGroup": 3,
  "loginTime": 1643914271799,
  "token": "<token-as-string>",
  "permissions": [
    {
      "code": "users",
      "read": true,
      "write": false
    },
    {
      "code": "permissions",
      "read": true,
      "write": false
    },
    {
      "code": "people",
      "read": true,
      "write": false
    },
    {
      "code": "wishes_and_items",
      "read": true,
      "write": false
    },
    {
      "code": "entries",
      "read": true,
      "write": false
    }
  ]
}
```

**Errors**

POST `/api/login`
```
{
  "username": "santa"
}
```

Status: 400

```
{
  "error": "invalid request"
}
```

POST `/api/login`
```
{
  "username": "santa"
  "password": "wrong-password"
}
```

Status: 401

```
{
  "error": "invalid username or password"
}


POST `/api/login`
```
{
  "username": "mickey"
  "password": "mouse"
}
```

Status: 403

```
{
  "error": "account has been disabled"
}
