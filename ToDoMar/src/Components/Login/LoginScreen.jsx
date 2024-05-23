import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "./loader.css";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const { login, loginWithGoogle, user } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {

  // }, []);

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Redirección
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(values);
    setTimeout(() => {
      if (!user.logged) {
        setLoading(false);
        // alert("Usuario o contraseña incorrectos");
        // return;
      } else {
        setLoading(false);
        // alert("¡Logueo exitoso!");
        // console.log(user);
        // return <Navigate to="/" replace />;
      }
    }, 1000);
  };

  if (loading) {
    return <Loader />;
  }

  if (user.logged) {
    return <Navigate to={`/show/${user.email}`} replace />;
  }

  return (
    <>
      <section>
        <h2 className="m-4">Ingresar</h2>
        <div className="container d-flex flex-column col-sm col-lg-4 my-2">
          <form className="form-control shadow" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label className="form-label d-flex" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                placeholder="email@mail.com"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
            </div>
            <div className="flex-column">
              <label className="form-label d-flex" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                placeholder="*******"
                name="password"
                value={values.password}
                onChange={handleInput}
              />
            </div>
            <div className="flex-column my-2 p-1">
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </div>
          </form>
          <div className="flex-column col-sm py-2 mt-3 g-2 buttons">
            <Link to="/register" className="btn btn-outline-info mb-2">
              No tengo usuario
            </Link>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={loginWithGoogle}
            >
              Ingresar con Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginScreen;
