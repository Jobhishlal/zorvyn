import { UserRole } from "../../domain/entity/user.entity";

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginUserDTO {
  email: string;
  password?: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserResponseDTO;
}
