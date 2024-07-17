import { generateRandomPosition } from "./getRandomCoordinate";
import { getArmy } from "../provider/StoreProvider/selectors/getArmy";
import { useSelector } from "react-redux";

function getRandomColor() {
  const colors = ["red", "blue", "green"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function addUnitPerson(canvasW: number, canvasH: number) {
  const randomSide = Math.random();
  const armyUser = useSelector(getArmy);
  if (!Array.isArray(armyUser)) {
    throw new Error("armyUser должен быть массивом");
  }
  const randomPerson = armyUser[Math.floor(Math.random() * armyUser.length)];

  // Если число меньше 0.5, генерируем позицию по левой стороне экрана, иначе - по правой
  // первый варик
  const position =
    randomSide < 0.5
      ? generateRandomPosition(30, 110, canvasH / 1.8, canvasH / 1.8 + 300)
      : generateRandomPosition(
          canvasW - 30,
          canvasW - 110,
          canvasH / 1.8,
          canvasH / 1.8 + 300
        );
  // второй варик с высотой
  // const position =
  //   randomSide < 0.5
  //     ? generateRandomPosition(
  //         30,
  //         110,
  //         canvasH / 7,
  //         canvasH / 2 + 300
  //       )
  //     : generateRandomPosition(
  //         canvasW - 30,
  //         canvasW - 110,
  //         canvasH / 7,
  //         canvasH / 2 + 300
  //       );
  // третий варик
  // const position = generateRandomPosition(30, canvasW - 30, canvasH / 1.6, canvasH - 100);

  const dx = (canvasW / 2 - position.x) / (randomPerson.speed * 60);
  const dy = (canvasH / 2.5 - position.y) / (randomPerson.speed * 60);

  return {
    ...position,
    dx,
    dy,
    color: getRandomColor(),
    damage: randomPerson.bring_money,
    img: randomPerson.image,
  };
}
