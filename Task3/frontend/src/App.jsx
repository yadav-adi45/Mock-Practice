import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
