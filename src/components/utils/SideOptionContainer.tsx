import React, { useState, useEffect } from "react";
import { Container, Divider } from "@chakra-ui/react";
import SideOptionItem from "./SideOptionItem";
import Option from "./Option";
import ModeOption from "./ModeOption";

export interface SideOptionContainerProps {
  options: Option[];
}

const SideOptionContainer: React.FC<SideOptionContainerProps> = ({
  options,
}) => {
  const [selectedSubOption, setSelectedSubOption] = useState<Option>(null);
  return (
    <Container h="100vh" w="25vw" className="bg-white">
      <h1 className="px-2 py-5 text-xl font-bold font-mono">
        <a href="#" className="no-underline hover:underline">
          Industrial Planning Online
        </a>
      </h1>
      <Divider />
      {options.map((option) => (
        <SideOptionItem
          option={option}
          selectedSubOption={selectedSubOption}
          setSelectedSubOption={setSelectedSubOption}
        />
      ))}
    </Container>
  );
};

export default SideOptionContainer;
