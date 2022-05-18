export class Card {
  public suite: string;
  public number: number;
  public value: string;

  /**
   *
   */
  constructor(val: string) {
    this.value = val;
    this.suite = val.substring(val.length - 1, val.length);
    this.number = Number.parseInt(val.substring(0, val.length - 1));
  }
}
