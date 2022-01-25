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
  ]
}
```
