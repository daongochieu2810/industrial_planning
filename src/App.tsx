import React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import MainMap from "./components/map/MainMap";
import SideOptionContainer from "./components/utils/SideOptionContainer";
import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" className="flex flex-row">
        <SideOptionContainer />
        <MainMap />
      </Box>
    </ChakraProvider>
  );
}

export default App;
