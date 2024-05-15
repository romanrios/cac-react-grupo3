import { createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userId = localStorage.getItem('userId');
      return userId ? localStorage.setItem(userId) : {}

    } catch (e) {
      console.log(e)
      return {
        user: "",
        logged: false
      }
    }
  });
  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(user))
  }, [user])
  console.log('logged!')

  const login = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .catch((e) => console.log(e.message))
  }
  const register = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .catch((e) => console.log(e.message))
  }
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      try {
        user
          ? setUser({
            email: user.email,
            logged: true
          })
          : setUser({
            email: null,
            logged: false
          })

      } catch (err) {
        console.log(err)

      }
    })
  }, [])

  const logout = () => {
    signOut(auth)
  }

  return (
    <AuthContext.Provider values={{
      user,
      login,
      logout,
      register,
      loginWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}