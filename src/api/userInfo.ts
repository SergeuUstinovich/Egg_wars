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
        console.log(data)
        return data
    })
    .catch(error => console.log("информация infoArmy" + error))
}

export function tapTap() {
    return axios.post('/api/main/tap-tap/',{
        tg_id: '12345',
        money: '1',
        energy: '1',
        hp: '1'
    })
    .then(() => undefined)
}

