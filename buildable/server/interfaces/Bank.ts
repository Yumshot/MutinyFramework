// Define the interface for a bank account object
export interface BankAccount {
  id: number;
  name: string;
  balance: number;
  transactions: object[];
  loans: object[];
}
