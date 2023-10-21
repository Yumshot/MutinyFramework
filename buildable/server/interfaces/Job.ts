// Define the interface for a job object
export interface Job {
  title: string;
  active: boolean;
  pay: number;
  tax_rate: number;
  exp: number;
  rank: number;
  rank_exp: number;
  possible_ranks: string[];
}
