export class Card {
  public suite: string;
  public number: string;
  public value: string;

  /**
   *
   */
  constructor(val: string) {
    this.value = val.trim();
    this.suite = val.trim().substring(val.length - 1, val.length).trim();
    this.number = val.trim().substring(0, val.length - 1).trim();
  }
}
