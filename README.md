# Digital Cow Hut Backend Assignment

# Deployed on Render

# Live API [link](https://cow-hut-backend-3y3k.onrender.com/)

# https://cow-hut-backend-3y3k.onrender.com/

### User api's

### Create a new User

Route: /api/v1/user/create-user (POST)

Request body:

```json
{
  "password": "password123",
  "role": "buyer", // value will be buyer or seller
  "name": {
    "firstName": "Hasibul",
    "lastName": "Hasan"
  },
  "phoneNumber": "01711111311",
  "address": "Dhaka",
  "budget": 7000,
  "income": 0
}
```

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Users created successfully",
  "data": {}
}
```

### Get All Users

Route: /api/v1/user/users (GET)

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": [{}, {}]
}
```

### Get a Single User

Route: /api/v1/user/users/:id (GET)

Request Param: :id

Response: The specified user object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User retrieved successfully",
  "data": {}
}
```

### Update a Single User

Route: /api/v1/users/:id (PATCH)

Request Param: :id

Response: The updated user object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User updated successfully",
  "data": {}
}
```

### Delete a User

Route: /api/v1/users/:id ( DELETE)

Request Param: :id

Response: The deleted user object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Uers deleted successfully",
  "data": {}
}
```

### Cow's api

### Create a New Cow

Route: /api/v1/cow/create-cows (POST)

Request body:

```json
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}
```

Response: The newly created cow object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Cow created successfully",
  "data": {}
}
```

### Get All Cows

Route: /api/v1/cow/cows (GET)

params :

- limit.
- sortBy
- sortOrder
  sortOrder=asc/des
- minPrice
- maxPrice
- location
- searchTerm

Request body:

Response: The cows array of objects.

Response Sample Pattern:

```json
  {
      "success": true,
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        "count":1050
        }
      "data": [{},{}] ,
  }
```

### Get a Single Cow

Route: /api/v1/cow/cows/:id (GET)

Request Param: :id

Response: The specified cow object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cow retrieved successfully",
  "data": {}
}
```

### Update a Single Cow

Route: /api/v1/cow/cows/:id (PATCH)

Request Param: :id

Response: The updated cow object.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cow updated successfully",
  "data": {}
}
```

### Delete a Cow

Route: /api/v1/cow/cows/:id ( DELETE)

Request Param: :id

Response: The deleted cow object

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Cow deleted successfully",
  "data": {}
}
```

### Order api's

Route: /api/v1/order/orders (POST)

Request body:

```json
{
  "cow": "ObjectId(“6473c6a50c56d0d40b9bb6a3)", // cow reference _id
  "buyer": "ObjectId(“6473c6a50c56d0d40b9bb6a3)" // user reference  _id
}
```

Route: /api/v1/order/orders (GET)

Request body:

Response: The ordered array of objects.

Response Sample Pattern:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Orders retrieved successfully",
  "data": {}
}
```
