import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Register = () => {

  
  return (
    <>
      <form onSubmit={handleLogin}>
        <label>Email
          <input 
            placeholder="johndoe@mail.com"
          />
        </label>
        <label>password
          <input 
            placeholder="*******"
          />
        </label>
      </form>
    </>
  )
}
export default Register