import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

export const Header = () => {

  const { logout, user } = useContext(AuthContext)

  return (
    <>
      <div className="header d-flex flex-column">
        <h1 className="display-2">
          To.do list.<i className="fa-solid fa-pen-to-square"></i>
        </h1>
        <h5>
          <i>No más olvidos</i>
        </h5>
        <div className="d-flex">
           {
            user.logged 
              ? <button className="btn btn-danger" onClick={() => logout()}>logout</button>
              : <a href="/login" className="btn btn-primary m-2">Login</a>

           }
        </div>
      </div>

    </>
  );
};
