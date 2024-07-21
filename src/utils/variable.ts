export function variable(ctx: CanvasRenderingContext2D) {
  const centerX = ctx.canvas.width / 4;
  const centerY = ctx.canvas.height / 4;

  const sizeCastle = centerX * 0.6;
  const squareX = centerX / 2 - sizeCastle / 2;
  const squareY = centerY / 2.4 - sizeCastle;

  const sizeBtn = centerX * 0.5;
  const buttonX = centerX / 2 - sizeBtn / 2;
  const buttonY = centerY / 1.2 - sizeBtn;

  const sizeText = centerX * 0.04;
  const textX = buttonX + sizeBtn / 2;
  const textY = buttonY + sizeBtn / 3.2;

  const sizeTapeX = centerX * 0.99;
  const sizeTapeY = centerY * 0.08;
  const tapeX = centerX / 1.98 - sizeTapeX / 2;
  const tapeY = centerY / 11.1 - sizeTapeY;

  const sizeBgTypeX = centerX + 2;
  const sizeBgTypeY = centerY * 0.09;
  const BgTypeX = centerX / 2.02 - sizeTapeX / 2;
  const BgTypeY = centerY / 12.5 - sizeTapeY;

  const sizeTextLvl = centerX * 0.05;
  const textLvlX = BgTypeX + sizeBgTypeX / 2;
  const textLvlY = BgTypeY + sizeTextLvl + 6;

  const sizeTexеHp = centerX * 0.036;
  const textLvlHpY = textLvlY + sizeTexеHp + 1;
  return {
    centerX,
    centerY,
    sizeCastle,
    squareX,
    squareY,
    sizeBtn,
    buttonX,
    buttonY,
    sizeText,
    textX,
    textY,
    sizeTapeX,
    sizeTapeY,
    tapeX,
    tapeY,
    sizeBgTypeX,
    sizeBgTypeY,
    BgTypeX,
    BgTypeY,
    sizeTextLvl,
    textLvlX,
    textLvlY,
    sizeTexеHp,
    textLvlHpY,
  };
}
