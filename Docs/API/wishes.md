## Add new wish

**Example**

POST `/api/wishes`
```
{
  "personId": 4,
  "itemName": "Toy Train",
  "description": "Must say toot toot"
}
```

Status: 201

```
{
  "id": 20,
  "personId": 4,
  "itemId": 11,
  "description": "Must say toot toot"
}
```

**Errors**

POST `/api/wishes`
```
{
  "personId": 1000,
  "itemName": "Toy Train",
  "description": "Must say toot toot"
}
```

Status: 404

```
{
  "error": "no person found with given id"
}
```

POST `/api/wishes`
```
{
  "personId": 4,
  "description": "Must say toot toot"
}
```

Status: 400

```
{
  "error": "malformed request"
}
```