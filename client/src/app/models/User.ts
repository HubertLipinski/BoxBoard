export class User {
  id: number;
  name: string;
  email: string;
  verified: Date;
  created: Date;
  updated: Date;
  roles: Array<object>;
  isAdmin: boolean;
}
