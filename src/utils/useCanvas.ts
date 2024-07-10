import { useEffect } from "react";
import { resizeCanvas } from "./resizeCanvas";


function useCanvas(draw: (context: CanvasRenderingContext2D, frameCount: number) => void, canvasCur: HTMLCanvasElement | null) {
  

  useEffect(() => {
    const canvas = canvasCur;
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

}

export default useCanvas;
