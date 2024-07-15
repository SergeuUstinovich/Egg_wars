import { generateRandomPosition } from "./getRandomCoordinate";

const arrHpc = [
    {
        damage: 1,
        speedRun: 15,
        color: 'red'
    },
    {
        damage: 1,
        speedRun: 15,
        color: 'blue'
    },
    {
        damage: 1,
        speedRun: 15,
        color: 'green'
    },
]

export function addUnitPerson(canvasW: number, canvasH: number) {
    const randomSide = Math.random();
    const randomPerson = arrHpc[Math.floor(Math.random() * arrHpc.length)]
  
    // Если число меньше 0.5, генерируем позицию по левой стороне экрана, иначе - по правой
    // первый варик
    // const position =
    //   randomSide < 0.5
    //     ? generateRandomPosition(30, 110, canvasH / 1.8, canvasH / 1.8 + 300)
    //     : generateRandomPosition(
    //         canvasW - 30,
    //         canvasW - 110,
    //         canvasH / 1.8,
    //         canvasH / 1.8 + 300
    //       );
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
    const position = generateRandomPosition(30, canvasW - 30, canvasH / 1.6, canvasH - 100);
  
    const dx = (canvasW / 2 - position.x) / (randomPerson.speedRun * 60);
    const dy = (canvasH / 2.5 - position.y) / (randomPerson.speedRun * 60);
  
    return { ...position, dx, dy, color: randomPerson.color, damage: randomPerson.damage };
  }