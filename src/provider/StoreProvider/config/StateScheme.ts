import { ArmyScheme } from "../../../types/ArmyType";
import { CoinScheme } from "../../../types/CoinType";

export interface StateShema {
    coins: CoinScheme;
    army: ArmyScheme;
}