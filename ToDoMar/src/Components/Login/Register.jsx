import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "./Loader";
import "./loader.css";

const Register = () => {
  const { register, loginWithGoogle, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // const emailVal = /^\S+@\S+\.\S+$/;
    const passwordVal = /(?=.*[!#@$^%*])[a-zA-Z0-9!#@$%*^]{6,100}$/;
    e.preventDefault();

    if (
      values.password !== values.passwordRepeat &&
      values.passwordRepeat !== ""
    ) {
      alert("contraseña incorrecta!");
      return;
    }
    // if (!values.password.match(passwordVal)) {
    //     alert('bad pass')
    //     return
    //   }
    setLoading(true);

    setTimeout(() => {
      try {
        register(values);
        console.log("ok!");
        setLoading(false);
      } catch (err) {
        console.log(err);
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
        <h2 className="m-4">Nuevo usuario</h2>
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
              <label className="form-label d-flex my-1" htmlFor="password">
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
            <div className="flex-row">
              <p className="pass-info mb-2 text-start">
                La contraseña debe ser de 6 o más caracteres y contener: 1 letra
                mayúscula y 1 número.-
              </p>
            </div>
            <div className="flex-column">
              <label className="form-label d-flex" htmlFor="passwordRepeat">
                Repetir contraseña
              </label>
              <input
                className="form-control"
                type="password"
                placeholder="*******"
                name="passwordRepeat"
                value={values.passwordRepeat}
                onChange={handleInput}
              />
            </div>
            <div className="flex-column my-2 p-1">
              <button type="submit" className="btn btn-outline-primary">
                Crear
              </button>
            </div>
          </form>
          <div className="flex-column col-sm py-2 mt-3 g-2 buttons">
            <Link to="/login" className="btn btn-outline-info mb-2">
              Ya tengo usuario
            </Link>
            <button
              onClick={loginWithGoogle}
              className="btn btn-outline-primary"
            >
              Ingresar con Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
