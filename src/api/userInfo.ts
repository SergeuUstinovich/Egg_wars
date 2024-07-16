import axios from "axios";

export function userInfo() {
    return axios.post('/api/main/main_info/',{
        tg_id: '12345',
        name: 'Сергей'
    })
    .then(response => {
        const img = response.data
        return img
    })
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
