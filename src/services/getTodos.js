import axios from "axios";

const apiUrl = "http://localhost:8080/to-dos/";

export default function getTodos() {
  const todos = axios.get(apiUrl).then((response) => response.data.todos);
  return todos;
}
