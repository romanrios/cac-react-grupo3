//importaciones
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Task } from "./Task.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

//componente Show
export const Show = () => {

  const { user } = useContext(AuthContext)
  const [tareas, setTareas] = useState([]);

  // Capturo el id
  const { userId } = useParams();

  const tareasCollection = collection(db, userId /*"Tareas"*/);

  // Marcar tarea realizada
  const updateRealizada = async (id, bool) => {
    const realizadaDoc = doc(tareasCollection, id);
    await updateDoc(realizadaDoc, { realizada: bool });
    getTareas();
  };

  // Esta va en el useEffect
  const getTareas = async () => {
    const data = await getDocs(tareasCollection);
    setTareas(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const deleteTarea = async (id) => {
    const tareasDoc = doc(tareasCollection, id);
    await deleteDoc(tareasDoc);
    getTareas(); // actualiza la tabla
  };

  // Confirmación Sweet Alert
  const confirmDelete = (id) => {
    mySwal.fire({
      title: "¿Estás seguro?",
      text: "Esto es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarea(id); // borra la tarea al confirmar
        mySwal.fire({
          title: "¡Borrado!",
          text: "La tarea fue eliminada.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <>
      <div className="contenedorShow">
        <table className="tablaTareas">
          <thead className="tituloTabla">
            <tr>
              <th>Realizada</th>
              <th>Descripción de la Tarea</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {tareas.map((tarea) => (
              <Task
                tarea={tarea}
                key={tarea.id}
                updateRealizada={updateRealizada}
                confirmDelete={confirmDelete}
                userId={userId}
              />
            ))}
          </tbody>
        </table>

        <div>
          <br></br>
          <Link to={`/create/${userId}`} className="crearTarea">
            <button className="btn btn-primary">Agregar nueva tarea</button>
          </Link>
        </div>
      </div>
    </>
  );
};
