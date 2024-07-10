import { RefObject, useEffect, useRef } from "react";
import { resizeCanvas } from "./resizeCanvas";


function useCanvas(draw: (context: CanvasRenderingContext2D, frameCount: number) => void): RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;

    if (context) {
      const render = () => {
        frameCount++;
        if(canvas) {
            resizeCanvas(canvas);
        }
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw]);
  return canvasRef
}

export default useCanvas;
