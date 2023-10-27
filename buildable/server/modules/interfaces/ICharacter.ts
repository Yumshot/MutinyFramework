export interface ICharacter {
  user_id: number;
  steam_target: string;
  characters: ICharacterData[];
}

export type Sex = "Male" | "Female";
export type LastLocation = { x: number; y: number; z: number; heading: number };

export interface ICharacterData {
  index: number;
  first_name: string;
  last_name: string;
  sex: Sex;
  date_of_birth: string;
  last_location: LastLocation;
  funding: {
    cash: number;
    bank: IBankAccount[];
  };
}

export type TransactionType = "deposit" | "withdrawal" | "transfer";

export interface ITransaction {
  account_number: number;
  amount: number;
  date: Date;
  type: TransactionType;
  description: string;
}

export interface IBankAccount {
  user_id: number;
  account_number: number;
  balance: number;
  transactions: ITransaction[];
}
