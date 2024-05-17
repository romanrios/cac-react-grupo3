import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./Components/Header.jsx";
import { Show } from "./Components/Show.jsx";
import { Create } from "./Components/Create.jsx";
import { Edit } from "./Components/Edit.jsx";
import { Footer } from "./Components/Footer.jsx";
import LoginScreen from "./Components/Login/LoginScreen.jsx";
import Register from "./Components/Login/Register.jsx"
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";

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
      <AuthProvider>
      <BrowserRouter> 

        <Routes>
       
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<Register />} />
   
          
        </Routes>
      </BrowserRouter>
     </AuthProvider>
    </>
  );
}

export default App;
