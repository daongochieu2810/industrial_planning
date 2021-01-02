import React from "react";
import { Container, Divider } from "@chakra-ui/react";
import SideOptionItem from "./SideOptionItem";

export interface SideOptionContainerProps {}

const SideOptionContainer: React.FC = () => {
  return (
    <Container h="100vh" w="25vw" className="bg-white">
      <h1 className="px-2 py-5 text-xl font-bold font-mono">
        <a href="#" className="no-underline hover:underline">
          Industrial Planning Online
        </a>
      </h1>
      <Divider />
      <SideOptionItem />
      <SideOptionItem />
    </Container>
  );
};

export default SideOptionContainer;
