import { createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userId = localStorage.getItem("userId");
      // console.log(user)
      return userId ? localStorage.setItem(userId) : {};
    } catch (e) {
      return {
        user: "",
        logged: false,
      };
    }
  });
  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(user));
  }, [user]);
  // console.log('logged!')

  const login = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        userCredential.user;
      })
      .catch((e) => {
        console.log(e.code);
        console.log(e.message);
      });
  };
  const register = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password).catch(
      (e) => console.log(e.message)
    );
  };
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);

      try {
        user
          ? setUser({
              email: user.email,
              logged: true,
            })
          : setUser({
              email: null,
              logged: false,
            });
      } catch (err) {
        console.log(err.code);
        console.log(err);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
