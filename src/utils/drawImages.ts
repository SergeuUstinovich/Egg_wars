import { coinJumpProps } from "../components/GameField/GameField";
import { variable } from "./variable";

export function drawCastle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  img: HTMLImageElement
) {
  ctx.drawImage(img, x, y, size, size);
}

export function coinUp(ctx: CanvasRenderingContext2D, coin: coinJumpProps, rise: number) {
  const { sizeCoinJump } = variable(ctx);
  ctx.font = `${sizeCoinJump}px PassionOne`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.fillStyle = "Yellow";
  ctx.strokeText(`+ ${coin.value}`, coin.x, coin.y - rise);
  ctx.fillText(`+ ${coin.value}`, coin.x, coin.y - rise);
}


