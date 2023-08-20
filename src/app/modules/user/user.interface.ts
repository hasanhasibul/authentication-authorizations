export interface userInterface {
  password: string;
  role: "buyer" | "seller" | "admin";
  name: {
    firstName: string;
    lastName: string;
  };
  passwordUpdatedAt?: {
    type: Date;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
}
