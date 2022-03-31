import axios from "axios";
import { apiUrl } from "../config";

export default function removeTodo(id) {
  axios({
    method: "delete",
    url: apiUrl,
    params: {
      id: `${id}`,
    },
  });
}
