export class Item {
  constructor() {
    this.id = null;
    this.name = "";
    this.value = 0;
    this.isCredit = false;
    this.date = new Date().toISOString().slice(0, 10);
    this.account = null;
    this.category = null;
  }
}
