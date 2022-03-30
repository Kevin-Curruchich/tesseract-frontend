import React, { useState } from "react";
import TodoForm from "./TodoForm";
import {
  RiCloseCircleLine,
  RiCheckboxCircleLine,
  RiArrowDownCircleLine,
  RiDeleteBin5Line,
} from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  showDescription,
  setEditTodo,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.is_done ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div className="header">
        <div
          key={todo.id}
          onClick={() => completeTodo(todo.id)}
          className="todo"
        >
          {todo.title}
        </div>
        <div className="icons">
          <RiArrowDownCircleLine
            onClick={() => showDescription(todo.id)}
            className="delete-icon todo-handler"
          />
          <TiEdit
            onClick={() => {
              setEdit({
                id: todo.id,
                value: todo.title,
                description: todo.description,
                is_done: todo.is_done,
              });
              setEditTodo((prev) => (prev === "My Todos" ? "Editing" : prev));
            }}
            className="edit-icon todo-handler"
          />
          <RiDeleteBin5Line
            onClick={() => removeTodo(todo.id)}
            className="delete-icon todo-handler"
          />
          <RiCheckboxCircleLine
            onClick={() => completeTodo(todo.id)}
            className="delete-icon todo-handler"
          />
        </div>
      </div>
      {todo.showDescription && (
        <div onClick={() => completeTodo(todo.id)} className="description">
          Description: {todo.description}
        </div>
      )}
    </div>
  ));
};

export default Todo;
