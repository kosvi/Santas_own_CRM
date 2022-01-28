## Get latest entries

**Examples**

GET `/api/entries`
Status: 200

```
[
  {
    "id": 3,
    "userId": 1,
    "personId": 1,
    "niceness": 10,
    "description": "something",
    "createdAt": "2022-01-27T18:48:08.355Z",
    "updatedAt": "2022-01-27T18:48:08.355Z"
  },
  {
    "id": 1,
    "userId": 2,
    "personId": 1,
    "niceness": 4,
    "description": "Took out the garbage",
    "createdAt": "2022-01-26T18:52:17.422Z",
    "updatedAt": "2022-01-26T18:52:17.422Z"
  },
  {
    "id": 2,
    "userId": 2,
    "personId": 1,
    "niceness": -10,
    "description": "Took a toy from anothers hand",
    "createdAt": "2022-01-26T18:52:17.422Z",
    "updatedAt": "2022-01-26T18:52:17.422Z"
  }
]
```

GET `/api/entries/?limit?1`
Status: 200

```
[
  {
    "id": 3,
    "userId": 1,
    "personId": 1,
    "niceness": 10,
    "description": "something",
    "createdAt": "2022-01-27T18:48:08.355Z",
    "updatedAt": "2022-01-27T18:48:08.355Z"
  }
]
```

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