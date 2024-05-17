import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Loading = () => {
  return (
    <>
      <span>Waaait for it...</span>
    </>
  )
}

const LoginScreen = () => {

  const [ loading, setLoading ] = useState(true)

  const { login, loginWithGppgle, user } = useContext(AuthContext)

  const [ values, setValues ] = useState({
    email: "",
    password: ""
  })

  const handleLogin = () => {
    return null
  }
  return (
    <>
     as
    </>
  )
}
export default LoginScreen