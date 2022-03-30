import React, { useState } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";

const apiUrl = "http://localhost:8080/to-dos/";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState("My Todos");

  useEffect(() => {
    getTodos();
  }, []);

  //METHODS

  const getTodos = async () => {
    await axios.get(apiUrl).then((res) => {
      setTodos(res.data.todos);
    });
  };

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    try {
      axios.post(apiUrl, todo).then((res) => {
        getTodos();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }
    setEditTodo((prev) => (prev === "Editing" ? "My Todos" : prev));
    try {
      axios({
        method: "patch",
        url: `${apiUrl}`,
        params: {
          id: `${todoId}`,
        },
        data: newValue,
      }).then(() => {
        getTodos();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = (id) => {
    try {
      axios({
        method: "delete",
        url: apiUrl,
        params: {
          id: `${id}`,
        },
      }).then(() => {
        getTodos();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = (id) => {
    try {
      const updateTodo = todos.find((todo) => todo.id === id);
      axios({
        method: "patch",
        url: `${apiUrl}`,
        params: {
          id: `${id}`,
        },
        data: {
          title: `${updateTodo.title}`,
          description: `${updateTodo.description}`,
          isDone: `${updateTodo.is_done === 1 ? 0 : 1}`,
        },
      }).then(() => {
        getTodos();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="TodoList--header">
        <h2>{editTodo}</h2>
        <p>{todos.filter((todo) => !todo.is_done).length} Left Todos</p>
      </div>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
        setEditTodo={setEditTodo}
      />
    </>
  );
}

export default TodoList;
