import useCanvas from "../../utils/useCanvas";
import style from './Canvas.module.scss'

type CanvasProps = {
    draw: (context: CanvasRenderingContext2D, frameCount: number) => void;
  } & React.HTMLProps<HTMLCanvasElement>;

function Canvas(props: CanvasProps) {
    const { draw, ...rest } = props
    const canvasRef = useCanvas(draw)

  return <canvas className={style.canvas} ref={canvasRef} {...rest} />;
}
export default Canvas;
