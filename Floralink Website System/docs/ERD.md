# FloraLink - Entity Relationship Diagram (ERD)

This diagram shows the database schema and relationships between entities in the FloraLink eCommerce system.

```mermaid
erDiagram
    User ||--o{ Order : places
    User ||--o{ Session : has
    User ||--o{ CartItem : has
    Product ||--o{ CartItem : contains
    Product ||--o{ OrderItem : contains
    Order ||--|{ OrderItem : includes

    User {
        string id PK
        string name
        string email UK
        string passwordHash
        boolean isAdmin
        datetime createdAt
    }

    Product {
        string id PK
        string name
        string description
        decimal price
        string imageUrl
        string category
        boolean featured
        datetime createdAt
        datetime updatedAt
    }

    CartItem {
        string productId FK
        int quantity
        datetime addedAt
        string userId FK
    }

    Order {
        string id PK
        string userId FK
        decimal total
        json shippingAddress
        json contactInfo
        json paymentInfo
        string status
        datetime createdAt
    }

    OrderItem {
        string orderId FK
        string productId FK
        int quantity
        decimal price
        string productName
    }

    Session {
        string id PK
        string userId FK
        datetime expiresAt
        datetime createdAt
    }
```

## Entity Descriptions

### User
- **Primary Key**: id
- **Unique Key**: email
- **Purpose**: Stores customer and administrator account information
- **Relationships**: 
  - One user can place many orders
  - One user can have many sessions
  - One user can have many cart items

### Product
- **Primary Key**: id
- **Purpose**: Stores flower product catalog information
- **Categories**: Romantic, Sympathy & Funeral, Wedding & Engagement, Celebrations, Seasonal & Special Days
- **Relationships**:
  - One product can be in many cart items
  - One product can be in many order items

### CartItem
- **Composite Key**: userId + productId
- **Purpose**: Stores temporary shopping cart data for users
- **Relationships**:
  - Many cart items belong to one user
  - Many cart items reference one product

### Order
- **Primary Key**: id
- **Foreign Key**: userId
- **Purpose**: Stores completed purchase transactions
- **Status Values**: pending, processing, shipped, delivered, cancelled
- **Relationships**:
  - Many orders belong to one user
  - One order contains many order items

### OrderItem
- **Composite Key**: orderId + productId
- **Purpose**: Stores individual products within an order (denormalized for historical data)
- **Relationships**:
  - Many order items belong to one order
  - Many order items reference one product

### Session
- **Primary Key**: id
- **Foreign Key**: userId
- **Purpose**: Manages user authentication sessions
- **Relationships**:
  - Many sessions belong to one user
```
