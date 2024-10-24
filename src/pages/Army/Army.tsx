import { useEffect, useState } from "react";
import ArmyList from "../../components/ArmyList/ArmyList";
import { useSelector } from "react-redux";
import { ArmyType } from "../../types/ArmyType";
import { getArmyAllList } from "../../provider/StoreProvider/selectors/getArmy";

const Army = () => {
  const armyUser = useSelector(getArmyAllList);
  const [army, setArmy] = useState<ArmyType[]>();

  useEffect(() => {
    if (Array.isArray(armyUser)) {
      if (armyUser) {
        setArmy(armyUser);
      }
    }
  }, [armyUser]);

  return (
    <>
      <ArmyList army={army} />
    </>
  );
};

export default Army;
