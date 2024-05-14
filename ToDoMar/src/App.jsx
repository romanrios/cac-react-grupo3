import { HashRouter, Routes, Route } from "react-router-dom";

import { Show } from "./Components/Show.jsx";
import { Create } from "./Components/Create.jsx";
import { Edit } from "./Components/Edit.jsx";

import { Header } from "./Components/Header.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
