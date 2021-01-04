export default class Option {
  public id: string;
  public itemName: string;
  public subOptions: Option[] | null;

  constructor(id: string, itemName: string, subOptions: Option[] | null) {
    this.id = id;
    this.itemName = itemName;
    this.subOptions = subOptions;
  }
}
