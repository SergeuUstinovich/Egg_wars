import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function listTasks(tg_id: string) {
  return axios
    .get(`${api_url}/main/tasks/${tg_id}/`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => error.Error);
}
