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
          To.do list.<i className="fa-solid fa-pen-to-square"></i>
        </h1>
        <h5>
          <i>No más olvidos</i>
        </h5>
        <div className="m-3">
          {user.logged ? (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleLogout()}
            >
              logout
            </button>
          ) : (
            <a href="/login" className="btn btn-outline-primary btn-sm">
              Login
            </a>
          )}
        </div>
      </div>
    </>
  );
};
