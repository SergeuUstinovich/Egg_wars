export interface BoxType {
  id: number;
  name: string;
  description: string;
  currency_min: number;
  currency_max: number;
  card_count_min: number;
  card_count_max: number;
  is_active: boolean;
}
