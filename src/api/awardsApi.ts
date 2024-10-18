import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export const awardsChests = (tg_id: string) => {
  return axios
    .get(`${api_url}/main/check_and_give_daly_bonus/${tg_id}/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
};
