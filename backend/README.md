# Finance Dashboard Backend

A clean architecture backend built with Node.js, Express, MongoDB, and TypeScript.

## 📁 Architecture
The project follows Clean Architecture with 4 distinct layers:
- **Domain Layer**: Contains business entities.
- **Application Layer**: Contains use cases, interfaces, and DTOs.
- **Infrastructure Layer**: Contains Mongoose models, repositories, and security configuration.
- **Presentation Layer**: Contains controllers and routers.

## 🔐 Login Flow
The authentication system works as follows:
1. **Request**: The client sends a POST request to `/api/users/login` with `email` and `password`.
2. **Validation**: The controller finds the user via the `IUserRepository` and verifies the password using `bcrypt`.
3. **Token Generation**: A JWT token is generated containing the user's `id` and `role`.
4. **Response**: 
   - The token is stored in an **HTTP-only cookie** for security.
   - The user's details and the token are also returned in the response body.

## 🛡️ Role Based Access Control (RBAC)
- **Admin**: Full access (CRUD operations for transactions and user management).
- **Analyst**: Can view transaction lists and access the **Dashboard Summary** API.
- **Viewer**: Read-only access to transaction lists.

## 🚀 Getting Started
1. **Install dependencies**: `npm install`
2. **Setup environment**: Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.
3. **Run in development**: `npm run dev`
4. **Build and Start**: `npm run build && npm run start`

## 📒 API Documentation

### 👤 User Module (`/api/users`)

#### 1. Register User
*   **Method**: `POST`
*   **URL**: `/api/users/register`
*   **Auth**: Public
*   **Request Body**:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "password": "Password123",
      "role": "Admin" // Admin, Analyst, Viewer
    }
    ```
*   **Success Response** (201):
    ```json
    {
      "message": "Resource created successfully",
      "data": {
        "id": "65f8a...",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "Admin"
      }
    }
    ```

#### 2. Login User
*   **Method**: `POST`
*   **URL**: `/api/users/login`
*   **Auth**: Public
*   **Request Body**:
    ```json
    {
      "email": "jane@example.com",
      "password": "Password123"
    }
    ```
*   **Success Response** (200):
    ```json
    {
      "message": "Operation successful",
      "data": {
        "token": "eyJhbGciOiJIUzI1Ni...",
        "user": {
          "id": "65f8a...",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "role": "Admin"
        }
      }
    }
    ```

#### 3. Get All Users
*   **Method**: `GET`
*   **URL**: `/api/users`
*   **Auth**: Admin Only
*   **Success Response** (200)

#### 4. Delete User
*   **Method**: `DELETE`
*   **URL**: `/api/users/:id`
*   **Auth**: Admin Only

---

### 💰 Transaction Module (`/api/transactions`)

#### 1. Create Transaction
*   **Method**: `POST`
*   **URL**: `/api/transactions`
*   **Auth**: Admin Only
*   **Request Body**:
    ```json
    {
      "amount": 1500,
      "category": "Salaries",
      "date": "2024-03-20T10:00:00Z",
      "description": "Monthly office salaries",
      "type": "Expense", // Income, Expense
      "userId": "65f8a..."
    }
    ```

#### 2. List Transactions
*   **Method**: `GET`
*   **URL**: `/api/transactions`
*   **Auth**: Authenticated (Admin sees all, Analyst/Viewer see their own)

#### 3. Dashboard Summary
*   **Method**: `GET`
*   **URL**: `/api/transactions/summary`
*   **Auth**: Admin or Analyst
*   **Success Response** (200):
    ```json
    {
      "message": "Operation successful",
      "data": {
        "totalIncome": 50000,
        "totalExpense": 32000,
        "netBalance": 18000,
        "monthlyReport": [
          { "month": "2024-03", "income": 5000, "expense": 3000 }
        ],
        "categoryReport": [
          { "category": "Rent", "amount": 2000 }
        ],
        "recentTransactions": [...]
      }
    }
    ```

#### 4. Update Transaction
*   **Method**: `PATCH`
*   **URL**: `/api/transactions/:id`
*   **Auth**: Admin Only

#### 5. Delete Transaction
*   **Method**: `DELETE`
*   **URL**: `/api/transactions/:id`
*   **Auth**: Admin Only
