import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header.jsx";
import { Show } from "./Components/Show.jsx";
import { Create } from "./Components/Create.jsx";
import { Edit } from "./Components/Edit.jsx";
import { Footer } from "./Components/Footer.jsx";
import LoginScreen from "./Components/Login/LoginScreen.jsx";
import Register from "./Components/Login/Register.jsx";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LoginScreen />} />

            <Route path="/show/:userId" element={<Show />} />
            <Route path="/edit/:userId/:id" element={<Edit />} />
            <Route path="/create/:userId" element={<Create />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
