// Define the interface for a bank account object
export interface BankAccount {
  id: number;
  name: string;
  acc_number: string;
  balance: number;
  transactions: object[];
  loans: object[];
}
