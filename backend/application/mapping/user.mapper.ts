import { User } from "../../domain/entity/user.entity.js";
import { UserResponseDTO } from "../dto/user.dto.js";

export class UserMapper {
  public static toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  public static toResponseDTOList(users: User[]): UserResponseDTO[] {
    return users.map(user => this.toResponseDTO(user));
  }
}
