export class Transaction {
  id: string;
  public date: Date;
  constructor(
    public user: number,
    public amount: number,
  ) {}
}
