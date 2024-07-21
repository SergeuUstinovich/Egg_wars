export function variable(ctx: CanvasRenderingContext2D) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height;

  const sizeCastle = centerX * 0.3;
  const squareX = centerX / 2 - sizeCastle / 2;
  const squareY = centerY / 2.4 - sizeCastle;

  const sizeBtn = centerX * 0.25;
  const buttonX = centerX / 2 - sizeBtn / 2;
  const buttonY = centerY - sizeBtn;

  const sizeText = centerX * 0.02;
  const textX = buttonX + sizeBtn / 2;
  const textY = buttonY + sizeBtn / 3.2;

  const sizeTapeX = centerX * 0.495;
  const sizeTapeY = centerY * 0.04;
  const tapeX = centerX / 1.98 - sizeTapeX / 2;
  const tapeY = centerY / 11.1 - sizeTapeY;

  const sizeBgTypeX = centerX + 2;
  const sizeBgTypeY = centerY * 0.045;
  const BgTypeX = centerX / 2.02 - sizeTapeX / 2;
  const BgTypeY = centerY / 12.5 - sizeTapeY;

  const sizeTextLvl = centerX * 0.025;
  const textLvlX = BgTypeX + sizeBgTypeX / 2;
  const textLvlY = BgTypeY + sizeTextLvl + 6;

  const sizeTexеHp = centerX * 0.018;
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
