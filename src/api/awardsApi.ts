import axios from "axios"

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export const awardsChests = (dailyBonuses: string, usePrise: boolean, bonusDay: number) => {
    return axios.post(`${api_url}/check_and_give_daly_bonus/`, {
        dailyBonuses,
        usePrise, bonusDay
    })
    .then((response) => {
        const data = response.data
        return data
    })
    .catch((error) => {
        error.Error
    })
}

export const awardsChestsGet = (tg_id: string) => {
    return axios.get(`${api_url}/check_and_give_daly_bonus/${tg_id}/`)
    .then((response) => {
        const data = response.data
        console.log(data)
        return data
    })
    .catch((error) => {
        error.Error
    })
}