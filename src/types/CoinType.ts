export interface CoinType {
    money: number
    energy_now: number
    hp_castle_now: number
    energy_start: number
    hp_castle_start: number
    lvl: number
    recharge_energy: number
}

export interface CoinScheme {
    infoUser?: CoinType
}