# store conception:
## main idea
- The main idea is to create a simple store where:
    * admin can add products
    * manager can manage products
    * user can buy products

## features
### admin
- manage product: name, price, description, image
- manage users: lock, unlock, type
- manage orders: view, update status
- manage cart: view, update status
- manage reviews: view, delete

### manager
- manage product: update(quantity, price, description, image)
- manage orders: view, update status
- manage cart: view, update status

### user
- view products
- manage cart: own cart (add, remove, update quantity)
- manage orders: own orders (view, update status)
- manage profile: update info

## technologies
- frontend: reactjs
- backend: nodejs
- database: mongodb
- authentication: jwt

## database schema
- users: id, name, email, password, type, status
- products: id, name, price, description, image, quantity, categoryID, brandID
- carts: id, userID, productID, quantity, status [pending, completed]
- orders: id, userID
- orderItems: id, orderID, productID, quantity, price
- reviews: id, productID, userID, rating [1-5], comment
