import DropIcon from "../assets/images/drop.png";
import {canvasSize} from '../components/constants/canvasSize'
import { elements } from "../components/constants/elementsSettings";

export const fillBlue = (context: CanvasRenderingContext2D | null) => {
    if (context !== null) {
      context.beginPath();
      context.rect(0, 0, canvasSize.width , canvasSize.height);
      context.fillStyle = "#f0f9ff";
      context.fill();
    }
  };

  export const fillWhite = (context: CanvasRenderingContext2D | null) => {
    if (context !== null) {
      context.beginPath();
      context.rect(0, 0, canvasSize.width , canvasSize.height);
      context.fillStyle = "#ffffff";
      context.fill();
    }
  };

  export const drawDefault = (context: CanvasRenderingContext2D | null) => {

    if (context !== null) {
      context.clearRect(0,0,canvasSize.width,canvasSize.height);
      const image = new Image();
      context.textAlign = "center";
      context.textBaseline = "top";
      image.src = DropIcon;
      image.onload = () => {
        context.drawImage(image, 113, 190, 20, 20);
      };

      context.font = "14px Inter-Medium,sans-serif";
      context.fillStyle = "#5D5FEF";
      context.lineWidth = 1;
      context.textAlign = "center";
      context.textBaseline = "hanging";
      context.fillText("Перетащите сюда", 121, 224);

      context.font = "12px Inter-Regular,sans-serif";
      context.fillStyle = "#6B7280";
      context.lineWidth = 1;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("любой элемент", 122, 252);
      context.fillText("из левой панели", 122, 265);
    }

 // requestAnimationFrame((context) => draw);
  };

  let elementsInCanvas = [];

  export const checkMovePosition =  (e: React.DragEvent<HTMLDivElement>): void => {
    let target = e.target as any;
    let coordX = e.pageX - target.offsetLeft;
    let coordY = e.pageY - target.offsetTop;
    // elements

  }

  export const drawElement = (context: CanvasRenderingContext2D | null, el:string) => {


  }

  export const drawLine = (context: CanvasRenderingContext2D | null, height:number, currentHeight:number) => {
    if (context) {

      context.beginPath();
      context.strokeStyle = "#5d5fef";
      context.lineWidth = 2;
      context.moveTo(0, currentHeight+height);  
      context.lineTo(canvasSize.width, currentHeight+height)
      context.stroke();

      

    }
   
  }



