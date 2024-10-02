import { useEffect, useState } from "react";
import ArmyList from "../../components/ArmyList/ArmyList";
import { useSelector } from "react-redux";
import { ArmyType } from "../../types/ArmyType";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";

const Army = () => {
  const armyUser = useSelector(getArmy);
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
