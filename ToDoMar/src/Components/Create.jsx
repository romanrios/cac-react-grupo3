//importaciones
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export const Create = () => {
  //estados
  const [tarea, setTarea] = useState("Nueva tarea");
  const [realizada, setRealizada] = useState(false);

  // navegación luego de que se ejecute una función
  const navigate = useNavigate();

  // referenciar a la basedate (colección) de firestore. Primero se llama a la colección que es db y segundo parámetro es el nombre de la base de datos
  const tareasCollection = collection(db, "Tareas");

  // función para crear una tarea
  const createTarea = async (e) => {
    e.preventDefault();
    await addDoc(tareasCollection, {
      tarea: tarea,
      realizada: false, // UNA TAREA NUEVA NUNCA ESTÁ REALIZADA
    }); //el primer parámetro es donde quiero volcar la info, el segundo son los datos a agregar
    navigate("/"); //quiero que navigate me lleve adónde están todos los datos una vez que creamos el nuevo ingreso.
  };
  return (
    <>
      <div className="contenedorForm">
        <h3>Agregar tarea</h3>
        <form onSubmit={createTarea}>
          <div className="inputs">
            <label className="form-label">Tarea</label>
            <input
              onChange={(e) => setTarea(e.target.value)}
              className="form-control"
              type="text"
              placeholder={tarea}
            />
            {/* <input
              id="inputInvisible"
              onChange={(e) => setRealizada(e.target.value)}
              className="form-control"
              type="boolean"
              placeholder={realizada}
            /> */}
          </div>
          <div className="formButtonsCreate">
            <button type="submit" className="btn btn-primary">
              Agregar nueva tarea
            </button>
            <Link to="/" className="btn btn-danger">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
