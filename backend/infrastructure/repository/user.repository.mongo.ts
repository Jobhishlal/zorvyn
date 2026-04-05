import { User } from "../../domain/entity/user.entity";
import { IUserRepository } from "../../application/interface/user.repository.interface";
import { UserModel } from "../model/user.model";

export class MongoUserRepository implements IUserRepository {
  public async save(user: User): Promise<User | null> {
    const createdUser = await UserModel.create({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    });
    return new User(createdUser.id, createdUser.name, createdUser.email, createdUser.role);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc) return null;
    return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.role, userDoc.password);
  }

  public async findById(id: string): Promise<User | null> {
    const userDoc = await UserModel.findById(id);
    if (!userDoc) return null;
    return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.role, userDoc.password);
  }

  public async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find();
    return userDocs.map(doc => new User(doc.id, doc.name, doc.email, doc.role, doc.password));
  }

  public async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedDoc = await UserModel.findByIdAndUpdate(id, user, { new: true });
    if (!updatedDoc) return null;
    return new User(updatedDoc.id, updatedDoc.name, updatedDoc.email, updatedDoc.role, updatedDoc.password);
  }

  public async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }
}
