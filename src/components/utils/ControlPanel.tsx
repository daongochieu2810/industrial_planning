import React, { useEffect, useState } from "react";
import SideOptionContainer from "./SideOptionContainer";
import Option from "./Option";
import ModeOption from "./ModeOption";

export default function ControlPanel() {
  const [options, setOptions] = useState<Option[]>(null);
  useEffect(() => {
    /**
     * Mode Options
     */
    const destructionMode: ModeOption = new ModeOption(
      "desMoOp",
      "Destruction Mode",
      [],
      () => {}
    );
    const creationMode: ModeOption = new ModeOption(
      "creModOp",
      "Creation Mode",
      [],
      () => {}
    );
    const parentModeOption: Option = new Option("modOp", "Mode Options", [
      creationMode,
      destructionMode,
    ]);

    /**
     * Extra Settings
     */
    const extras: Option = new Option("extras", "Extra Settings", []);

    setOptions([parentModeOption, extras]);
  }, []);
  return <SideOptionContainer options={options ? options : []} />;
}
