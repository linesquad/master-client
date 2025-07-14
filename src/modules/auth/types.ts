export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  phone: string;
}
