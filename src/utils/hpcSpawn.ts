import { generateRandomPosition } from "./getRandomCoordinate";
import { ArmyType } from "../types/ArmyType";

export function addUnitPerson(
  canvasW: number,
  canvasH: number,
  armyUser: ArmyType | undefined
) {
  const randomSide = Math.random();
  if (!Array.isArray(armyUser)) {
    throw new Error("armyUser должен быть массивом");
  }

  const randomPerson = armyUser[Math.floor(Math.random() * armyUser.length)];

  const position =
    randomSide < 0.5
      ? generateRandomPosition(10, 60, canvasH / 7, canvasH / 1.8 + 200)
      : generateRandomPosition(
          canvasW - 10,
          canvasW - 60,
          canvasH / 7,
          canvasH / 1.8 + 200
        );
  // второй варик с высотой
  // const position =
  //   randomSide < 0.5
  //     ? generateRandomPosition(
  //         30,
  //         110,
  //         canvasH / 2,
  //         canvasH / 2 + 300
  //       )
  //     : generateRandomPosition(
  //         canvasW - 30,
  //         canvasW - 110,
  //         canvasH / 2,
  //         canvasH / 2 + 300
  //       );
  // третий варик
  // const position = generateRandomPosition(30, canvasW - 30, canvasH / 1.6, canvasH - 100);

  const dx = (canvasW / 2 - position.x) / (randomPerson.speed * 60);
  const dy = (canvasH / 3 - position.y) / (randomPerson.speed * 60);

  return {
    ...position,
    dx,
    dy,
    color: randomPerson.name, // Временно
    damage: randomPerson.bring_money,
    img: randomPerson.image,
  };
}
