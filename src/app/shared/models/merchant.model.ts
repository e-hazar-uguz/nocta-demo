export interface Transaction {
[x: string]: any;
  id: any;
  merchantName: string;
  merchantMCC: number;
  transactionAmount: string;
  transactionDate: string;
  formattedDate :string;
}
