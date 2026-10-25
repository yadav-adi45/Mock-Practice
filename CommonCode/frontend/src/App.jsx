// ==========================================
// FRONTEND SETUP COMMANDS (Run in terminal):
// 1. npm create vite@latest frontend -- --template react
// 2. cd frontend
// 3. npm i axios react-router-dom
// 4. Clear App.css and index.css (no CSS)
// 5. To run: npm run dev
// ==========================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
