import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import getTodos from "../services/getTodos";
import updateTodo from "../services/updateTodo";

export default function TodoList() {
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, [todos]);

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

  return (
    <>
      <div className="TodoList--header">
        <h2>My Todos</h2>
        <p>{todos.filter((todo) => !todo.is_done).length} Left Todos</p>
      </div>
      <div className="TodoList--data">
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} setEdit={setEdit} />
        ))}
      </div>
    </>
  );
}
