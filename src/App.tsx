import React, { useState } from "react";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import MainMap from "./components/map/MainMap";
import ControlPanel from "./components/utils/ControlPanel";
import "./App.css";

function App() {
  const theme = extendTheme({
    styles: {
      global: {
        div: {
          outline: 0,
          border: 0
        }
      }
    }
  })
  const [mode, setMode] = useState<string | null>(null);
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" className="flex flex-row outline-none">
        <ControlPanel setMode={setMode} />
        <MainMap mode={mode} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
