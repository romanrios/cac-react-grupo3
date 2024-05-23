//importaciones
import { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export const Create = () => {
  //estados
  const { user } = useContext(AuthContext)

  const [tarea, setTarea] = useState({
    tarea: "",
    // user: "",
    realizada: false
  });

  const [realizada, setRealizada] = useState(false);

  // Capturo el id
  const { userId } = useParams();

  // navegación luego de que se ejecute una función
  const navigate = useNavigate();

  // referenciar a la basedate (colección) de firestore. Primero se llama a la colección que es db y segundo parámetro es el nombre de la base de datos
  const tareasCollection = collection(db, userId /*"Tareas"*/);

  // función para crear una tarea
  const createTarea = async (item) => {
  //   e.preventDefault();
    await addDoc(tareasCollection, item)
    .catch(e => console.log('create error', e.message))
  //     tarea: tarea,
  //     realizada: false, // UNA TAREA NUEVA NUNCA ESTÁ REALIZADA
  //   }); //el primer parámetro es donde quiero volcar la info, el segundo son los datos a agregar
  //return navigate(`/show/${userId}`); //quiero que navigate me lleve adónde están todos los datos una vez que creamos el nuevo ingreso.
  };
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      user: user.email,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createTarea(tarea)
    return navigate(`/show/${userId}`)
  }
  return (
    <>
      <div className="contenedorForm">
        <h3>Agregar tarea</h3>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label 
              className="form-label"
              htmlFor="tarea">Tarea</label>
            <input
              onChange={handleChange}
              className="form-control"
              name="tarea"
              type="text"
              placeholder="Ej: pasear el perro"
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
