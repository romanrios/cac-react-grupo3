//importaciones
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";

export const Edit = () => {
  // Estados
  const [tarea, setTarea] = useState("Nueva tarea");
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

  // Traigo la tarea apenas coarga el componente Edit
  useEffect(() => {
    getTareaByID(id);
  }, []);

  return (
    <>
      <div className="contenedorForm">
        <h3>Editar tarea</h3>
        <form onSubmit={updateTarea}>
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
            <button type="submit" className="btn btn-primary">
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
