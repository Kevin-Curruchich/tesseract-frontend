const apiUrl = "http://localhost:8080/to-dos/";
export default function getTodos() {
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => {
      const { todos = [] } = res;
      return todos;
    });
}
