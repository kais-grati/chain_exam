import { useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { Route, Routes } from "react-router-dom";
import Home from "../UI/pages/Home";
import Navbar from "../UI/components/Navbar";
import Dashboard from "../UI/pages/Dashboard";

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>

  );
}

export default App;
