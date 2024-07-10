import { forwardRef, ReactNode, Ref, RefCallback, RefObject, useEffect } from "react";
import useCanvas from "../../utils/useCanvas";
import style from './Canvas.module.scss'

type CanvasProps = {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void;
  } & React.HTMLProps<HTMLCanvasElement>; 


export type Refs = HTMLCanvasElement;

const Canvas = forwardRef<Refs, CanvasProps>((props, ref) => {
    const { draw } = props
  
  return <canvas className={style.canvas} ref={ref}  />;
})
export default Canvas;
