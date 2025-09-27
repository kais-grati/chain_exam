import { Route, Routes } from "react-router-dom";
import Home from "../UI/pages/Home";
import Navbar from "../UI/components/Navbar";
import Dashboard from "../UI/pages/Dashboard";
import Help from "../UI/pages/Help";
import About from "../UI/pages/About";

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>

  );
}

export default App;
