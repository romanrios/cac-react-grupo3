import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header.jsx";
import { Show } from "./Components/Show.jsx";
import { Create } from "./Components/Create.jsx";
import { Edit } from "./Components/Edit.jsx";
import { Footer } from "./Components/Footer.jsx";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
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
      <Footer />
    </>
  );
}

export default App;
