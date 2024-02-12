export class Wallet {
  id: string;
  ballance: number;
  lastUpdate: Date;
  constructor(public user: number) {
    this.ballance = 0;
  }
}
