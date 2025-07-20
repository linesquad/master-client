export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Profile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: Date;
  phone: string;
}

export interface Client extends User {
  phone: string;
}
