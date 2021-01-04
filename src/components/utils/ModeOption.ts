import Option from "./Option";
export interface ModeOptionOnClickFunction {
  (): void;
}
export default class ModeOption extends Option {
  public onClick: ModeOptionOnClickFunction;
  constructor(
    id: string,
    itemName: string,
    subOptions: Option[],
    onClick: ModeOptionOnClickFunction
  ) {
    super(id, itemName, subOptions);
    this.onClick = onClick;
  }
}
