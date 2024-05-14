//importaciones
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const [tareas, setTareas] = useState([]);
  const tareasCollection = collection(db, "Tareas");

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
    Swal.fire({
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
        Swal.fire({
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
              <tr
                className={tarea.realizada ? "fondoRealizada" : ""}
                key={tarea.id}
              >
                <td>
                  {tarea.realizada ? (
                    <button
                      className="realizadaCheckbox"
                      onClick={() => updateRealizada(tarea.id, false)}
                    >
                      ✔️
                    </button>
                  ) : (
                    <button
                      className="realizadaCheckbox"
                      onClick={() => updateRealizada(tarea.id, true)}
                    >
                      {" "}
                      ⬜
                    </button>
                  )}
                </td>

                <td
                  className={tarea.realizada ? "tdTareaRealizada" : "tdTarea"}
                >
                  {tarea.tarea}
                </td>

                <td className="editarTareas">
                  <Link
                    to={`edit/${tarea.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => confirmDelete(tarea.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <br></br>
          <Link to="/create" className="crearTarea">
            <button className="btn btn-primary">Agregar nueva tarea</button>
          </Link>
        </div>
      </div>
    </>
  );
};
