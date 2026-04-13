# Database Schemas

## User Model

| Field | Type | Required | Additional Properties |
|-------|------|----------|----------------------|
| name | String | Yes | - |
| email | String | Yes | Unique, indexed |
| password | String | Yes | Hashed before save |
| isAdmin | Boolean | No | Default: false |
| createdAt | Date | Auto | - |
| updatedAt | Date | Auto | - |

## Product Model

| Field | Type | Required | Additional Properties |
|-------|------|----------|----------------------|
| name | String | Yes | - |
| category | String | Yes | - |
| subcategory | String | No | - |
| brand | String | No | - |
| price | Number | Yes | Original price |
| discountedPrice | Number | No | - |
| images | Array of Strings | No | Image URLs |
| shortDescription | String | Yes | - |
| longDescription | String | No | - |
| stock | Number | No | Default: 0 |
| rating | Number | No | Default: 0, Range: 0-5 |
| numReviews | Number | No | Default: 0 |
| isFeatured | Boolean | No | Default: false |
| tags | Array of Strings | No | For search/filtering |
| createdAt | Date | Auto | - |
| updatedAt | Date | Auto | - |

## Cart Model

| Field | Type | Required | Additional Properties |
|-------|------|----------|----------------------|
| user | ObjectId | Yes | Reference to User model |
| items | Array | No | - |
| items[].product | ObjectId | Yes | Reference to Product model |
| items[].quantity | Number | Yes | Default: 1 |
| createdAt | Date | Auto | - |
| updatedAt | Date | Auto | - |

## Order Model

| Field | Type | Required | Additional Properties |
|-------|------|----------|----------------------|
| orderNumber | String | Yes | Unique, Format: JAMYYYYMMDDSequence |
| user | ObjectId | Yes | Reference to User model |
| items | Array | No | - |
| items[].product | ObjectId | No | Reference to Product model |
| items[].quantity | Number | No | - |
| items[].price | Number | No | Price at time of order |
| items[].name | String | No | Product name at time of order |
| totalAmount | Number | Yes | - |
| shippingAddress | Object | No | - |
| shippingAddress.address | String | No | - |
| shippingAddress.city | String | No | - |
| shippingAddress.postalCode | String | No | - |
| shippingAddress.country | String | No | - |
| paymentMethod | String | No | - |
| status | String | No | Enum: pending, confirmed, shipped, outForDelivery, delivered, cancelled; Default: pending |
| statusHistory | Array | No | Track status changes |
| statusHistory[].status | String | No | - |
| statusHistory[].timestamp | Date | No | - |
| statusHistory[].note | String | No | - |
| createdAt | Date | Auto | - |
| updatedAt | Date | Auto | - |
