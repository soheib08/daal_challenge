import { Observable } from 'rxjs';

export interface CreateTransactionRequest {
  user: number;
  amount: number;
}
export interface Transaction {
  id: string;
  user: number;
  amount: number;
  date: Date;
}
export interface DailyReportRequest {}

export interface DailyReportResponse {
  count: number;
}

export interface TransactionService {
  createTransaction(data: CreateTransactionRequest): Observable<Transaction>;
  dailyReport(data: DailyReportRequest): Observable<DailyReportResponse>;
}
