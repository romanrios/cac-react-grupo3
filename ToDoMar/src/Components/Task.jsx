import { Link } from "react-router-dom";

export const Task = ({ tarea, updateRealizada, confirmDelete, userId }) => {
  return (
    <>
      <tr className={tarea.realizada ? "fondoRealizada" : ""}>
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

        <td className={tarea.realizada ? "tdTareaRealizada" : "tdTarea"}>
          {tarea.tarea}
        </td>

        <td className="editarTareas">
          <Link
            to={`/edit/${userId}/${tarea.id}`}
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
    </>
  );
};
