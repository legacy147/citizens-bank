export const TRANSACTIONS = [
  // ─── The big incoming deposit (most recent) ───
  {
    id: 13,
    merchant: 'Incoming Wire Transfer',
    date: '2026-09-14',
    time: '12:45 PM',
    amount: 980000.00,
    status: 'Completed',
    category: 'Deposit',
    description: 'Government Service Compensation',
    sentFrom: 'Department of Defense and Accounting Service',
  },

  // ─── Older activity that nets to $371 ───
  { id: 12, merchant: 'Phone Bill',        date: '2026-09-10', amount: -39.78,   status: 'Completed', category: 'Bills' },
  { id: 11, merchant: 'Target',            date: '2026-09-06', amount: -31.45,   status: 'Completed', category: 'Shopping' },
  { id: 10, merchant: 'Dinner @ Cafe',     date: '2026-09-02', amount: -78.00,   status: 'Completed', category: 'Food' },
  { id: 9,  merchant: 'Gas Station',       date: '2026-08-27', amount: -42.80,   status: 'Completed', category: 'Transport' },
  { id: 8,  merchant: 'Amazon',            date: '2026-08-22', amount: -89.99,   status: 'Completed', category: 'Shopping' },
  { id: 7,  merchant: 'Spotify',           date: '2026-08-18', amount: -9.99,    status: 'Completed', category: 'Subscriptions' },
  { id: 6,  merchant: 'Netflix',           date: '2026-08-15', amount: -15.99,   status: 'Completed', category: 'Entertainment' },
  { id: 5,  merchant: 'Groceries',         date: '2026-08-12', amount: -153.25,  status: 'Completed', category: 'Shopping' },
  { id: 4,  merchant: 'Starbucks',         date: '2026-08-09', amount: -8.75,    status: 'Completed', category: 'Food' },
  { id: 3,  merchant: 'Uber',              date: '2026-08-07', amount: -24.50,   status: 'Completed', category: 'Transport' },
  { id: 2,  merchant: 'Coffee Shop',       date: '2026-08-05', amount: -5.50,    status: 'Completed', category: 'Food' },
  { id: 1,  merchant: 'Initial Deposit',   date: '2026-08-01', amount: 871.00,   status: 'Completed', category: 'Deposit' },
];