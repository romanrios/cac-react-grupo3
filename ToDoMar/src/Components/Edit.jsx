//importaciones
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal);

export const Edit = () => {
  // Estados
  const [tarea, setTarea] = useState({
    tarea: "",
  });
  const [realizada, setRealizada] = useState(false);

  // Redirección
  const navigate = useNavigate();

  // Capturo el id
  const { userId, id } = useParams();

  // Update Tarea
  const updateTarea = async (e) => {
    const tareaDoc = doc(db, userId /*"Tareas"*/, id);
    e.preventDefault();
    await updateDoc(tareaDoc, {
      tarea: tarea,
      realizada: false,
    });
    navigate(`/show/${userId}`);
  };

  // Traer tarea por Id
  const getTareaByID = async (id) => {
    const tareaDoc = await getDoc(doc(db, userId /*"Tareas"*/, id));
    if (tareaDoc.exists()) {
      setTarea(tareaDoc.data().tarea);
      setRealizada(false);
    }
  };

  //función para preguntar si quiere confirmar la edición
  const confirmEdit = (id) => {
    mySwal
      .fire({
        title: "¿Estás seguro?",
        text: "Esta acción es irreversible",
        imageUrl: "./ansiedad.png",
        imageWidth: 400,
        imageAlt: "ansiedad",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, editar",
        cancelButtonText: "Cancelar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateTarea(id); //
          mySwal.fire({
            title: "¡Editado!",
            text: "Tu tarea fue editada.",
            icon: "success",
          });
        }
      });
  };

  // Traigo la tarea apenas coarga el componente Edit
  useEffect(() => {
    getTareaByID(id);
  }, []);

  return (
    <>
      <div className="contenedorForm">
        <h3>Editar tarea</h3>
        <form onSubmit={confirmEdit}>
          <div className="inputs">
            <label className="form-label">Tarea</label>
            <input
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              className="form-control"
              type="text"
              //   placeholder={tarea}
            />
          </div>
          <div className="formButtonsCreate">
            <button
              type="submit"
              onClick={() => tarea.id}
              className="btn btn-primary"
            >
              Confirmar edición
            </button>
            <Link to={`/show/${userId}`} className="btn btn-danger">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
