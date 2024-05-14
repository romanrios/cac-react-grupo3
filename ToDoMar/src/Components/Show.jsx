//importaciones
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firabaseConfig/firebase.js";

//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

//estilos
// import "../styles/Show.css";

//componente Show
export const Show = () => {
  //configurar el useState. Tareas es un array vacío y setTareas lo actualiza
  const [tareas, setTareas] = useState([]);

  //referenciar ala basede datos de firestore.
  const tareasCollection = collection(db, "Tareas");

  //función para mostrar los documentos de Tareas
  const getTareas = async () => {
    const data = await getDocs(tareasCollection);

    setTareas(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  //función para borrar una tarea
  const deleteTarea = async (id) => {
    const tareasDoc = doc(tareasCollection, id);
    await deleteDoc(tareasDoc);
    getTareas(); //invocamos a la función para que se actualice la tabla en la pantalla del usuario
  };

  //funcióon para llamar a la ventana de sweetalert para confirmar la eliminación
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
        deleteTarea(id); //va acá porque quiero que borre el héroe cuando apreta el botón de confirmar
        Swal.fire({
          title: "¡Borrado!",
          text: "Tu archivo fue eliminado.",
          icon: "success",
        });
      }
    });
  };

  //useEffect
  useEffect(() => {
    getTareas();
  }, [tareas]);

  return (
    <>
      <div className="contenedorShow">
        <table className="tablaTareas">
          <thead className="tituloTabla">
            <tr>
              <th>Tarea</th>
              <th>Realizada</th>
              <th>Editar</th>
            </tr>
          </thead>

          <tbody>
            {tareas.map((tarea) => (
              <tr key={tarea.id}>
                <td>{tarea.tarea}</td>

                <td>{tarea.realizada}</td>

                <td className="editarTareas">
                  <Link to={`edit/${tarea.id}`} className="btn btn-light">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    className="botonDelete"
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
            Agregar nueva tarea
          </Link>
        </div>
      </div>
    </>
  );
};
