import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import addTodo from "../services/addTodo";

export default function TodoApp() {
  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="TodoList--header"></div>
      <TodoList />
    </>
  );
}
