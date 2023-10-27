export const DEFAULT_JOBS = [
  {
    title: "UNEMPLOYED",
    active: true,
    pay: 0,
    tax_rate: 0,
    exp: 0,
    rank: 0,
    rank_exp: 0,
    possible_ranks: [],
  },
  {
    title: "dock_worker",
    active: false,
    pay: 17,
    tax_rate: 6.2,
    exp: 0,
    rank: 0,
    rank_exp: 0,
    possible_ranks: [
      "Receving Clerk",
      "Dock Worker",
      "Forklift Operator",
      "Dock Foreman",
    ],
  },
];
