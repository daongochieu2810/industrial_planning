import React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import MainMap from "./components/map/MainMap";
import ControlPanel from "./components/utils/ControlPanel";
import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" className="flex flex-row">
        <ControlPanel />
        <MainMap />
      </Box>
    </ChakraProvider>
  );
}

export default App;
