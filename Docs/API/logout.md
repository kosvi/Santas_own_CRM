## Logout current user

**Example**

DELETE `/api/logout`
Status: 200

```
{
  "msg": "logged out"
}
```

## Logout single session 

**Example**

DELETE `/api/logout/session/<token-as-string>`
Status: 204

## Delete sessions from user

**Example**

DELETE `/api/logout/user/3`
Status: 200

```
{
  "msg": "2 sessions deleted"
}
```
