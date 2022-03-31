import axios from "axios";
import { apiUrl } from "../config";

export default function completeTodo(todo) {
  axios({
    method: "patch",
    url: `${apiUrl}`,
    params: {
      id: `${todo.id}`,
    },
    data: {
      title: `${todo.title}`,
      description: `${todo.description}`,
      isDone: `${todo.is_done === 1 ? 0 : 1}`,
    },
  }).catch((error) => {
    console.error(error);
  });
}
