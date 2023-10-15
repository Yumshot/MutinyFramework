import { BankAccount } from "./Bank";
import { CashFunds } from "./Cash";
import { Job } from "./Job";
import { Priority } from "./Priority";

export interface DataParameterCreateUserCredentials {
  0: NewCharacter;
  1: Priority;
}

export interface NewCharacter {
  first_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  last_location: { x: number; y: number; z: number; heading: number };
  model: object;
  funds: {
    cash: CashFunds;
    bank: BankAccount[];
  };
  job: Job[];
}