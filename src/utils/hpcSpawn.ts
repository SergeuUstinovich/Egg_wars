import { generateRandomPosition } from "./getRandomCoordinate";
import { ArmyType } from "../types/ArmyType";
import { v4 } from 'uuid';

export function addUnitPerson(
  canvasW: number,
  canvasH: number,
  armyUser: ArmyType[] | undefined
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

  const dx = (canvasW / 2 - position.x) / (randomPerson.speed * 60);
  const dy = (canvasH / 3 - position.y) / (randomPerson.speed * 60);

  return {
    ...position,
    dx,
    dy,
    color: randomPerson.name, // Временно
    damage: randomPerson.damage,
    img: randomPerson.image,
    idWarrior: randomPerson.id_warrior,
    id: v4()
  };
}
