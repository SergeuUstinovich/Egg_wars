export interface BoxType {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface BoxPrizeType {
  currency_received: number;
  card_count: number;
}
