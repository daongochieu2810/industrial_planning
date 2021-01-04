import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import SideOptionContainer from "./SideOptionContainer";
import Option from "./Option";
import ModeOption from "./ModeOption";
import { MODE_IDS } from "../config/ModeIds";

interface ControlPanelProps {
  setMode: Dispatch<SetStateAction<string | null>>;
}

export default function ControlPanel({ setMode }: ControlPanelProps) {
  const [options, setOptions] = useState<Option[]>(null);
  useEffect(() => {
    /**
     * Mode Options
     */
    const destructionMode: ModeOption = new ModeOption(
      MODE_IDS.destructionMode,
      "Destruction Mode",
      [],
      () => {
        console.log("FROM CONTROL PANEL");
        setMode(MODE_IDS.destructionMode);
      }
    );
    const creationMode: ModeOption = new ModeOption(
      MODE_IDS.creationMode,
      "Creation Mode",
      [],
      () => {
        console.log("FROM CONTROL PANEL AGAIN");
        setMode(MODE_IDS.creationMode);
      }
    );
    const parentModeOption: Option = new Option(
      MODE_IDS.modeOption,
      "Mode Options",
      [creationMode, destructionMode]
    );

    /**
     * Extra Settings
     */
    const extras: Option = new Option(
      MODE_IDS.extraSettings,
      "Extra Settings",
      []
    );

    setOptions([parentModeOption, extras]);
  }, []);
  return <SideOptionContainer options={options ? options : []} />;
}
