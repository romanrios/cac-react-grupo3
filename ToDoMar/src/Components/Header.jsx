import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <>
      <div className="header d-flex flex-column">
        <h1 className="display-2">
          To.do list.
          <i className="fa-solid fa-pen-to-square" />
        </h1>
        <h5 className="noMasOlvidos">No más olvidos</h5>
        <div className="m-3">
          {user.logged ? (
            <>
              <span>
                <i className="fa-solid fa-user mx-1" /> {user.email}
              </span>
              <button
                className="btn btn-outline-danger btn-sm mx-2"
                onClick={() => handleLogout()}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <a href="./" className="btn btn-outline-primary btn-sm">
              Ingresá para ver tus tareas
            </a>
          )}
        </div>
      </div>
    </>
  );
};
