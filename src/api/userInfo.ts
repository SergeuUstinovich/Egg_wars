import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function userInfo(tg_id: string, name: string) {
    return axios.get(`${api_url}/main/main_info/${tg_id}/${name}/`)
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация userInfo" + error))
}

export function infoArmy(tg_id: string) {
    return axios.get(`${api_url}/main/takin_army/${tg_id}/`)
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация infoArmy" + error))
}

export function tapTap(tg_id: string, money: number, energy: number, hp: number) {
    return axios.post(`${api_url}/main/tap-tap/`,{
        tg_id,
        money,
        energy,
        hp
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация tapTap" + error))
}

export function upDamage(tg_id: string, id_warrior: number) {
    return axios.post(`${api_url}/main/upgrade_army_bring_money/`,{
        tg_id,
        id_warrior,
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация upDamage" + error))
}

export function upSpeed(tg_id: string, id_warrior: number) {
    return axios.post(`${api_url}/main/upgrade_army_speed/`,{
        tg_id,
        id_warrior,
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация upSpeed" + error))
}

export function referalLink(tg_id: string) {
    return axios.get(`${api_url}/main/generate_link/${tg_id}/`)
    .then(response => {
        const data  = response.data.ref_link
        return data
    })
    .catch(error => console.log("информация referalLink" + error))
}

export function addFriends(tg_id: string, referral_id: string) {
    return axios.get(`${api_url}/main/completeReferral/${tg_id}/${referral_id}/`)
    .then(response => {
        const data  = response.data
        return data
        
    })
    .catch(error => error.Error)
}

export function listFriends(tg_id: string) {
    return axios.post(`${api_url}/main/all_friends/`, {
        tg_id
    })
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
    .catch(error => error.Error)
}

