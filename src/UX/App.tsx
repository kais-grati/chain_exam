import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { Route, Routes } from "react-router-dom";
import Home from "../UI/pages/Home";
import Navbar from "../UI/components/Navbar";

function App() {
  const currentAccount = useCurrentAccount();

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>

    // <>
    //   <Flex
    //     position="sticky"
    //     px="4"
    //     py="2"
    //     justify="between"
    //     style={{
    //       borderBottom: "1px solid var(--gray-a2)",
    //     }}
    //   >
    //     <Box>
    //       <Heading>Chain Exam</Heading>
    //     </Box>

    //     <Box>
    //       <ConnectButton />
    //     </Box>
    //   </Flex>
    //   <Container>
    //     <Container
    //       mt="5"
    //       pt="2"
    //       px="4"
    //       style={{ background: "var(--gray-a2)", minHeight: 500 }}
    //     >

    //     </Container>
    //   </Container>
    // </>
  );
}

export default App;
