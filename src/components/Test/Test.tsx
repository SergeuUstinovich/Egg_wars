import { ElementRef, useRef } from "react";
import FancyButton from "../CanvasTest/CanvasTest";

function Test() {
    const canvasRef = useRef<ElementRef<"canvas">>(null);
    let ctx = canvasRef.current?.getContext("2d");

    return <FancyButton ref={canvasRef}/>
}

export default Test