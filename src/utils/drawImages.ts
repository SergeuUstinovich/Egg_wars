import { drawProgressBar } from "./drawCanvas";


export function drawCastle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    img: HTMLImageElement
) {
    ctx.drawImage(img, x, y, size, size);
}

export function drawBtn(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    img: HTMLImageElement,
    scale: number,
    progress: number
) {
    // ctx.drawImage(img, x, y, size, size);
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.scale(scale, scale);
    drawProgressBar(ctx, 0, 0, size / 2.33, progress);
    ctx.restore();
}