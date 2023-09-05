import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

import { Footer } from "./componenst/Footer";

import { AllRoutes } from "./AllRoutes/AllRoutes";

import Navbar from "./componenst/Navbar";

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <AllRoutes />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
