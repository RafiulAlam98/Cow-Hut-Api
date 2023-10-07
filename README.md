# cow-hut-server

### github repo link : https://github.com/RafiulAlam98/cow-hut

### All Routes for Cow-Hut-Server

### Live Link 
https://cow-hut-core-service.vercel.app/

# Application Routes:

### Sample User(Seller/Buyer) Post json type
```
{
    "password": "hell8123",
    "role": "seller",
    "name": {
        "firstName": "Mwdejkcfnwjh",
        "lastName": "Showqjefhibqujkpon"
    },
    "phoneNumber": "01743wsdhcbwe714175",
    "address": "Dhwedhieujaka",
    "income": 0
}
```

### User
- https://cow-hut-core-service.vercel.app/api/v1/auth/signup [create user] (POST)
- https://cow-hut-core-service.vercel.app/api/v1/users [get all users] (GET)
- https://cow-hut-core-service.vercel.app/api/v1/users/65200deb815549cee5d05da4 [get Single user] (GET)
- https://cow-hut-core-service.vercel.app/api/v1/users/65200deb815549cee5d05da4 (Update Single user) (PATCH)
- https://cow-hut-core-service.vercel.app/api/v1/users/65200deb815549cee5d05da4 [Delete Single user] (DELETE)

### Cows
- https://cow-hut-core-service.vercel.app/api/v1/cows (post)[add cow]
- https://cow-hut-core-service.vercel.app/api/v1/cows/ (get)[get all cows]
- https://cow-hut-core-service.vercel.app/api/v1/cows/65201113281c3ae5145ad3a7 (get)[get single cow ]
- https://cow-hut-core-service.vercel.app/api/v1/cows/65201113281c3ae5145ad3a7 [patch]
- https://cow-hut-core-service.vercel.app/api/v1/cows/65201113281c3ae5145ad3a7 [delete]

### Sample Cow Data for create a cow
```
{
  "name": "king",
  "age": 4,
  "price": 17800,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "648dbc743f8caeacd1d9211e"
}
```
### pagination field for cow

- https://cow-hut-core-service.vercel.app/api/v1/cows?page=1&limit=1 [page and limit]
- https://cow-hut-core-service.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc  [sort]
- https://cow-hut-core-service.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000  
- https://cow-hut-core-service.vercel.app/api/v1/cows?location=Chattogram 
- https://cow-hut-core-service.vercel.app/api/v1/cows?searchTerm=Cha
  
### Orders
- https://cow-hut-core-service.vercel.app/api/v1/orders [create order]
- https://cow-hut-core-service.vercel.app/api/v1/orders [get all order]


### Sample Cow Order Data to create a Order
```
{
  "cow": "65200deb815549cee5d05da4",
  "buyer": "65200e1b815549cee5d05dac"
}
```
