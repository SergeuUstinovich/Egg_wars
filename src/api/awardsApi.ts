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
    });
  // .catch((error) => {
  //   console.error("Error occurred:", error);
  // });
};

export function openBox(tg_id: string, box_id: number) {
  return axios
    .post(`${api_url}/box/open/`, {
      tg_id,
      box_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => console.log(error));
}

export const getBoxes = () => {
  return axios
    .get(`${api_url}/box/open/`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    .then((response) => {
      const data = response.data;
      return data;
    });
};
