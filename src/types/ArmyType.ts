export interface ArmyType {
    id_warrior: number
    name: string
    speed: number
    bring_money: number
    lvl_speed: number,
    price_speed: number,
    lvl_bring_money: number,
    price_bring_money: number,
    image: string
}

export interface ArmyScheme {
    armyUser?: ArmyType
}