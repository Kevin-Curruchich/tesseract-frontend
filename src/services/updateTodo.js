import axios from "axios";
import { apiUrl } from "../config";

export default function updateTodo(todoId, newValue) {
  if (!newValue.title || /^\s*$/.test(newValue.title)) {
    return;
  }
  axios({
    method: "patch",
    url: `${apiUrl}`,
    params: {
      id: `${todoId}`,
    },
    data: newValue,
  }).catch((error) => console.error(error));
}
