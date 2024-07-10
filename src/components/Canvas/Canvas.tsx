import { forwardRef } from "react";
import style from './Canvas.module.scss'

// type CanvasProps = {
//     draw: (context: CanvasRenderingContext2D, frameCount: number) => void;
//   } & React.HTMLProps<HTMLCanvasElement>; 


export type Refs = HTMLCanvasElement;

const Canvas = forwardRef<Refs>((_, ref) => {
  return <canvas className={style.canvas} ref={ref}  />;
})
export default Canvas;
