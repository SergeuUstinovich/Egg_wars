import axios from "axios";

const api_url = import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_BASE_URL;

export function userInfo(tg_id: string, name: string) {
    return axios.post(`${api_url}/main/main_info/`,{
        name,
        tg_id
        
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация userInfo" + error))
}

export function infoArmy(tg_id: string, name: string) {
    return axios.post(`${api_url}/main/takin_army/`,{
        name,
        tg_id
    })
    .then(response => {
        const data  = response.data
        return data
    })
    .catch(error => console.log("информация infoArmy" + error))
}

interface taptapProps {
    energy: number
    money: number
    hp: number
}

export function tapTap(tg_id: string, money: number, energy: number, hp: number) {
    return axios.post('/api/main/tap-tap/',{
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

