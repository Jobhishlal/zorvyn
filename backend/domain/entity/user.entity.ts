export enum UserRole {
  ADMIN = "Admin",
  ANALYST = "Analyst",
  VIEWER = "Viewer",
}

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly password?: string
  ) {}

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  public isAnalyst(): boolean {
    return this.role === UserRole.ANALYST;
  }

  public isViewer(): boolean {
    return this.role === UserRole.VIEWER;
  }
}
