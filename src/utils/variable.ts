export function variable(ctx: CanvasRenderingContext2D) {
    const centerX = ctx.canvas.width;
    const centerY = ctx.canvas.height;

    const sizeCastle = ctx.canvas.width * 0.6;
    const squareX = ctx.canvas.width / 1.9 - sizeCastle / 2;
    const squareY = ctx.canvas.height / 2.1 - sizeCastle;

    const sizeBtn = ctx.canvas.width * 0.5;
    const buttonX = ctx.canvas.width / 1.9 - sizeBtn / 2;
    const buttonY = ctx.canvas.height / 1.14 - sizeBtn;

    const sizeText = ctx.canvas.width * 0.04;
    const textX = ctx.canvas.width / 1.29 - sizeBtn / 2;
    const textY = ctx.canvas.height / 1.05 - sizeBtn;
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
        textY
    }
}