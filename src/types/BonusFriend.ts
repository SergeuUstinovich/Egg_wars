export interface BonusInfo {
  money: number;
  cards: number;
}

export interface MyBonusCard {
  name: string;
  now_cards: number;
  max_cards: number;
  evolve_lvl: number;
  image: string;
}

export interface Bonuses {
  Info_ordinary_bonus?: BonusInfo;
  Info_prime_bonus?: BonusInfo;
  My_Bonus_Card?: MyBonusCard;
}

export interface BonusFr {
    bonuses?: Bonuses
}
