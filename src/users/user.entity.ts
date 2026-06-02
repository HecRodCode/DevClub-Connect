export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  role: Role;
  createdAt: Date;
}