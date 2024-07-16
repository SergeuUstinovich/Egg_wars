export function variable(ctx: CanvasRenderingContext2D) {
  const centerX = ctx.canvas.width;
  const centerY = ctx.canvas.height;

  const sizeCastle = ctx.canvas.width * 0.6;
  const squareX = ctx.canvas.width / 2 - sizeCastle / 2;
  const squareY = ctx.canvas.height / 2.4 - sizeCastle;

  const sizeBtn = ctx.canvas.width * 0.5;
  const buttonX = ctx.canvas.width / 2 - sizeBtn / 2;
  const buttonY = ctx.canvas.height / 1.23 - sizeBtn;

  const sizeText = ctx.canvas.width * 0.04;
  const textX = ctx.canvas.width / 1.33 - sizeBtn / 2;
  const textY = ctx.canvas.height / 1.12 - sizeBtn;

  const sizeTapeX = ctx.canvas.width * 0.99;
  const sizeTapeY = ctx.canvas.height * 0.08;
  const tapeX = ctx.canvas.width / 1.98 - sizeTapeX / 2;
  const tapeY = ctx.canvas.height / 11.1 - sizeTapeY;

  const sizeBgTypeX = ctx.canvas.width + 2;
  const sizeBgTypeY = ctx.canvas.height * 0.09;
  const BgTypeX = ctx.canvas.width / 2.02 - sizeTapeX / 2;
  const BgTypeY = ctx.canvas.height / 12.5 - sizeTapeY;

  const sizeTextLvl = ctx.canvas.width * 0.05;
  const textLvlX = BgTypeX + sizeBgTypeX / 2;
  const textLvlY = BgTypeY + sizeTextLvl + 6;

  const sizeTexеHp = ctx.canvas.width * 0.036;
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
