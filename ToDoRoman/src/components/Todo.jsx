import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? "todoLiComplete" : "todoLi"}>
      <div className="todoRow">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? "todoTextComplete" : "todoText"}
        >
          {todo.text}
        </p>
      </div>
      <button className="todoDelete" onClick={() => deleteTodo(todo.id)}>
        {<FaRegTrashAlt />}
      </button>
    </li>
  );
};

export default Todo;
