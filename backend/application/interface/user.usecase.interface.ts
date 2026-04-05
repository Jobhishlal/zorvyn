import { UserResponseDTO, CreateUserDTO } from "../dto/user.dto.js";

export interface ICreateUserUseCase {
  execute(data: CreateUserDTO): Promise<UserResponseDTO | null>;
}

export interface IGetAllUsersUseCase {
  execute(): Promise<UserResponseDTO[]>;
}

export interface IDeleteUserUseCase {
  execute(id: string): Promise<boolean>;
}
