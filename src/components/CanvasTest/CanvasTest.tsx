import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export type Ref = HTMLCanvasElement;

const FancyButton = forwardRef<Ref, Props>((_, ref) => (
  <canvas ref={ref} />
));

export default FancyButton