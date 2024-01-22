export interface OrderInterface {
  user: {
    firstName: string;
    lastName: string;
    mail: string;
    phone: string;
  };
  order: {
    flatsCount: number;
    time: number;
  };
}
