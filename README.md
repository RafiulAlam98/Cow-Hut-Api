# cow-hut server

### github repo link : https://github.com/Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-RafiulAlam98

### All Routes for Cow-Hut-Server

### Live Link 

# Application Routes:

### Sample User(Seller/Buyer) Post json type
```{
  "seller": {
    "name": {
      "firstName": "luka",
      "lastName": "mia"
    },
    "phoneNumber": "+1 123-456-7890",
    "address": "123 Main St, cumilla, dhaka",
    "income": 1000
  }
}
```

### User
- https://cow-hut-zeta.vercel.app/api/v1/auth/signup/seller [create/signup a seller] (POST)
- https://cow-hut-zeta.vercel.app/api/v1/auth/signup/buyer [create/signup a buyer] (POST)
- https://cow-hut-zeta.vercel.app/api/v1/users [get all users] (GET)
- https://cow-hut-zeta.vercel.app/api/v1/users/649d453a4020c7b61481095b [get Single user] (GET)
- https://cow-hut-zeta.vercel.app/api/v1/users/649d453a4020c7b61481095b (Update Single user) (PATCH)
- https://cow-hut-zeta.vercel.app/api/v1/users/649d453a4020c7b61481095b [Delete Single user] (DELETE)

### Seller
- https://cow-hut-zeta.vercel.app/api/v1/seller [Get all seller]
- https://cow-hut-zeta.vercel.app/api/v1/seller/649d3ee44020c7b614810943 [get single seller]
- https://cow-hut-zeta.vercel.app/api/v1/seller/649d3ee44020c7b614810943 [patch]
- https://cow-hut-zeta.vercel.app/api/v1/seller/649d3ee44020c7b614810943 [delete]

### Buyer
- https://cow-hut-zeta.vercel.app/api/v1/buyer/ [get all buyer]
- https://cow-hut-zeta.vercel.app/api/v1/buyer/649d45394020c7b614810958 [get single buyer]
- https://cow-hut-zeta.vercel.app/api/v1/buyer/649d45394020c7b614810958 [patch]
- https://cow-hut-zeta.vercel.app/api/v1/buyer/649d45394020c7b614810958 [delete]

### Cows
- https://cow-hut-zeta.vercel.app/api/v1/cows/addcows [add cow]
- https://cow-hut-zeta.vercel.app/api/v1/cows/ [get all cows]
- https://cow-hut-zeta.vercel.app/api/v1/cows/649d46554020c7b614810964 [get single cow ]
- https://cow-hut-zeta.vercel.app/api/v1/cows/649d46554020c7b614810964 [patch]
- https://cow-hut-zeta.vercel.app/api/v1/cows/649d46554020c7b614810964 [delete]

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

- https://cow-hut-zeta.vercel.app/api/v1/cows?page=1&limit=1 [page and limit]
- https://cow-hut-zeta.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc  [sort]
- https://cow-hut-zeta.vercel.app/api/v1/cows?minPrice=20000&maxPrice=70000  
- https://cow-hut-zeta.vercel.app/api/v1/cows?location=Chattogram 
- https://cow-hut-zeta.vercel.app/api/v1/cows?searchTerm=Cha
  
### Orders
- https://cow-hut-zeta.vercel.app/api/v1/order/addOrder [add order]
- https://cow-hut-zeta.vercel.app/api/v1/order/allOrder [get all order]


### Sample Cow Order Data to create a Order
```
{
  "cow": "648dbe893f8caeacd1d92178",
  "buyer": "648dbdd53f8caeacd1d92154"
}
```
