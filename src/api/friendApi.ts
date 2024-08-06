import axios from "axios";
import { validateError } from "../helpers/validateError";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function referalLink(tg_id: string) {
    return axios.get(`${api_url}/main/generate_link/${tg_id}/`)
    .then(response => {
        const data  = response.data.ref_link
        return data
    })
    .catch(error => console.log("информация referalLink" + error))
}

export function listFriends(tg_id: string) {
    return axios.get(`${api_url}/main/all_friends/${tg_id}/`)
    .then(response => {
        const data  = response.data
        return data
        
    })
    .catch(error => error.Error)
}

export function bonusTake(tg_id: string, referral_system_id: number) {
    return axios.post(`${api_url}/main/taking_bonus/`, {
        tg_id,
        referral_system_id
    })
    .then(response => {
        const data  = response.data
        return data
        
    })
    .catch(validateError)
}

export function infoBonus(tg_id: string) {
    return axios.get(`${api_url}/main/info_bonus/${tg_id}/`)
    .then(response => {
        const data  = response.data
        return data
        
    })
    .catch(validateError)
}