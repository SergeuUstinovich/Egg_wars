import { useSelector } from "react-redux";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
// import style from "./Upgrage.module.scss";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";
import { useEffect, useState } from "react";
import ArmyList from "../../components/ArmyList/ArmyList";
import { ArmyType } from "../../types/ArmyType";


function Upgrade() {
  const armyUser = useSelector(getArmy);
  const [army, setArmy] = useState<ArmyType[]>()

  useEffect(() => {
    if(Array.isArray(armyUser)) {
        if(armyUser) {
            setArmy(armyUser)
        }
    }
  }, [armyUser])
  
  return (
    <ModalRoute>
      <ArmyList army={army} />
    </ModalRoute>
  );
}
export default Upgrade;
