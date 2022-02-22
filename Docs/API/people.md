## GET base

**Error**

GET `/api/people`
Status: 400

```
{
  "error": "you must give a keyword to search people"
}
```

## Search people by name

**Example**

GET `/api/people/?name=mal`
Status: 200

```
[
  {
    "id": 1,
    "name": "Mikko Mallikas",
    "birthdate": "2014-11-15",
    "address": "Mikonkatu 12",
    "createdAt": "2022-01-24T07:53:48.355Z",
    "updatedAt": "2022-01-24T07:53:48.355Z"
  },
  {
    "id": 2,
    "name": "Maija Mallikas",
    "birthdate": "2012-07-30",
    "address": "Mikonkatu 12",
    "createdAt": "2022-01-24T07:53:48.355Z",
    "updatedAt": "2022-01-24T07:53:48.355Z"
  }
]
```

## Display single person with wishes

**Example**

GET `/api/people/2`
Status: 200

```
{
  "id": 2,
  "name": "Maija Mallikas",
  "birthdate": "2012-07-30",
  "address": "Mikonkatu 12",
  "createdAt": "2022-01-24T07:53:48.355Z",
  "updatedAt": "2022-01-24T07:53:48.355Z",
  "wishes": [
    {
      "id": 3,
      "description": "I want it to be lovely!",
      "item": {
        "id": 1,
        "name": "Pony"
      }
    },
    {
      "id": 4,
      "description": "I want it to be lovely!",
      "item": {
        "id": 2,
        "name": "Toy car"
      }
    }
  ],
  "entries": [
    {
      "id": 1,
      "userId": 1,
      "niceness": 4,
      "description": "Took out the garbage",
      "createdAt": "2022-01-25T18:19:13.271Z",
      "updatedAt": "2022-01-25T18:19:13.271Z"
    },
    {
      "id": 2,
      "userId": 1,
      "niceness": -10,
      "description": "Took a toy from anothers hand",
      "createdAt": "2022-01-25T18:19:13.271Z",
      "updatedAt": "2022-01-25T18:19:13.271Z"
    }
  ]
}
```

**Errors**

GET `/api/people/10`
Status: 404

```
{
  "error": "no person found with id: 10"
}
```

GET `/api/people/foo`
Status: 400

```
{
  "error": "malformed id given"
}
```

## Add new person

**Example**

POST `/api/people`
```
{
  "name":"John Doe",
  "address": "Doestreet 60",
  "birthdate": "2001-06-10"
}
```

Status: 201

```
{
  "id": 14,
  "name": "John Doe",
  "birthdate": "2001-06-10",
  "address": "Doestreet 60",
  "updatedAt": "2022-02-20T18:44:08.504Z",
  "createdAt": "2022-02-20T18:44:08.504Z"
}
```

## Update person

This will only update name & address. Birthdate has to be posted, but it will not be updated at the moment. 

**Example**

PUT `/api/people/14`
```
{
  "name":"Foo Bar",
  "address": "Foostreet 60",
  "birthdate": "1993-01-14"
}
```

Status: 200

```
{
  "id": 14,
  "name": "Foo Bar",
  "birthdate": "2001-06-10",
  "address": "Foostreet 60",
  "createdAt": "2022-02-20T18:44:08.504Z",
  "updatedAt": "2022-02-20T18:47:02.424Z"
}
```
