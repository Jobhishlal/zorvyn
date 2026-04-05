export enum ApiStatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessages {
  SUCCESS = "Operation successful",
  CREATED = "Resource created successfully",
  INTERNAL_SERVER_ERROR = "Something went wrong",
  UNAUTHORIZED = "Unauthorized access",
  FORBIDDEN = "Permission denied",
  NOT_FOUND = "Resource not found",
  USER_EXISTS = "User already exists",
  INVALID_CREDENTIALS = "Invalid credentials",
  MISSING_FIELDS = "Please provide all required fields",
  INVALID_INPUT = "Invalid input data",
}

export enum RouterPaths {
  USERS = "/api/users",
  TRANSACTIONS = "/api/transactions",
  DASHBOARD = "/api/dashboard",
}
