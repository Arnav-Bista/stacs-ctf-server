export interface IdorUser {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface IdorInvoice {
  id: number;
  user_id: number;
  vendor: string;
  description: string;
  amount: number;
  is_admin: boolean;
}

export const USERS: IdorUser[] = [
  { id: 1, username: 'alice', password: 'alice123', role: 'user' },
  { id: 2, username: 'bob', password: 'bob456', role: 'user' },
  { id: 3, username: 'admin', password: 'xK9mP2vL8n', role: 'admin' },
];

export const INVOICES: IdorInvoice[] = [
  { id: 1, user_id: 2, vendor: 'Secret Provider', description: 'The Secret Key - (need to rename from defaults)', amount: 2400.00, is_admin: false },
  { id: 2, user_id: 2, vendor: 'Amazon Web Services', description: 'Cloud Infrastructure - EC2 + S3 (monthly)', amount: 890.00, is_admin: false },
  { id: 3, user_id: 1, vendor: 'Office Depot', description: 'Office Supplies - Q4 2024', amount: 45.00, is_admin: false },
  { id: 4, user_id: 1, vendor: 'Adobe Systems', description: 'Creative Suite Annual License', amount: 120.00, is_admin: false },
  { id: 5, user_id: 1, vendor: 'British Airways', description: 'Travel Expenses - Edinburgh Conference', amount: 320.00, is_admin: false },
  { id: 6, user_id: 2, vendor: 'SecureConsult Ltd', description: 'Q4 Security Audit\n\nNote: flagged for admin review. Restricted invoices require elevated session privileges to access.', amount: 5500.00, is_admin: false },
  { id: 7, user_id: 3, vendor: 'REDACTED', description: '[CLASSIFIED - ADMIN ONLY] Black budget allocation FY2025', amount: 999999.00, is_admin: true },
  { id: 8, user_id: 3, vendor: 'REDACTED', description: '[CLASSIFIED - ADMIN ONLY] Executive security review\n\nAuthorisation confirmed.\n\nflag{jwt_role_escalation_granted}', amount: 150000.00, is_admin: true },
  { id: 9, user_id: 3, vendor: 'REDACTED', description: '[CLASSIFIED - ADMIN ONLY] Executive compensation package review', amount: 500000.00, is_admin: true },
];

export const JWT_SECRET = 'secret';
