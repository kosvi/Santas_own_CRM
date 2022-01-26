## List items by popularity

Lists all items in the database sorted by popularity of the item. (Item wished the most as first in the array)

You can limit the amount of items returned by query parameter `limit`

**Examples**

GET `/api/items` 
Status: 200

```
[
  {
    "count": "3",
    "item": {
      "id": 1,
      "name": "Pony"
    }
  },
  {
    "count": "1",
    "item": {
      "id": 5,
      "name": "Xbox"
    }
  },
  {
    "count": "1",
    "item": {
      "id": 9,
      "name": "skates"
    }
  }
]
```

GET `/api/items/?limit=2`
Status: 200

```
[
  {
    "count": "3",
    "item": {
      "id": 3,
      "name": "Chess"
    }
  },
  {
    "count": "3",
    "item": {
      "id": 1,
      "name": "Pony"
    }
  }
]
```

**Errors**

GET `/api/items/?limit=foo`
Status: 400

```
{
  "error": "limit has to be an integer"
}
```
