import axios from "axios";
import { apiUrl } from "../config";

export default function addTodo(todo) {
  if (!todo.title || /^\s*$/.test(todo.title)) {
    return;
  }

  axios.post(apiUrl, todo).catch((error) => {
    console.error(error);
  });
}
