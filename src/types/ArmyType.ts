export interface ArmyType {
  id_warrior: number;
  name: string;
  speed: number;
  damage: number;
  lvl_speed: number;
  price_speed: number;
  lvl_damage: number;
  price_damage: number;
  cards: number;
  max_cards: number;
  lvl: number;
  image: string;
}

export interface ArmyScheme {
  armyUser?: ArmyType[];
}
