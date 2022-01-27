## Add new entry

**Example**

POST `/api/entries`
```
{
  "personId": 1,
  "niceness": 10,
  "description": "something"
}
```

Status: 201

```
{
  "id": 3,
  "personId": 1,
  "userId": 1,
  "niceness": 10,
  "description": "something",
  "updatedAt": "2022-01-27T18:48:08.355Z",
  "createdAt": "2022-01-27T18:48:08.355Z"
}
```

**Errors**

POST `/api/entries`
```
{
  "personId": 1,
  "niceness": "string",
  "description": "something"
}
```

Status: 400

```
{
  "error": "Incorrect or missing number"
}
```

POST `/api/entries`
```
{
  "personId": 1,
  "niceness": 10,
  "description": 1
}
```

Status: 400

```
{
  "error": "Malformed string"
}
```