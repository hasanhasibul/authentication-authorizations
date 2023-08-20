export interface adminInterface {
  phoneNumber: string;
  role: "admin";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
}
