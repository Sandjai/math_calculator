import DropIcon from "../assets/images/drop.png";
import {canvasSize} from '../components/constants/canvasSize'
import { elements, elementsEntities, entities } from "../components/constants/elementsSettings";
let padding = 10;

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


  };



  export const checkMovePosition =  (e: React.DragEvent<HTMLDivElement>): void => {
    let target = e.target as any;
    let coordX = e.pageX - target.offsetLeft;
    let coordY = e.pageY - target.offsetTop;
    // elements

  }

  export const drawElements = (context: CanvasRenderingContext2D | null, inCanvas:string[], activeEl:string) => {

   let elList = [...inCanvas];
   (activeEl === 'Display') ? elList.unshift(activeEl) : elList.push(activeEl);
   
if ((activeEl !== 'Display')) {
  let displayIndex = elList.indexOf('Display');
   
   if (displayIndex !== -1 && displayIndex !== 0) {
    elList.splice(displayIndex,displayIndex);
    elList.unshift('Display')
   }

}
 

   let currentHeight = 0;
   
    for (let el of  elList) {
      let element = entities[el as keyof typeof entities];
      
      if (context) {
        switch (el) {
          case 'Display':
            context.beginPath();
        context.rect(0, currentHeight, canvasSize.width, element.height);
        context.fillStyle = "#f3f4f6";
        context.fill();
        context.font = "35px Inter-ExtraBold";
        context.fillStyle = "#000000";
        context.fillText("0", canvasSize.width-20, currentHeight+32);
        currentHeight = currentHeight + element.height + padding;
        
        break;
        case 'Operations':
          for (let i=0; i<4; i++) {
            context.strokeStyle = "#e2e3e5";
            context.lineWidth = 1;
            context.roundRect(6 + 60*i, currentHeight+4 , 52, 48, 6)
            context.stroke();     
            context.font = "14px Inter-Medium";
            context.fillStyle = "#000000";
            context.fillText(element.data[i], 32 + 60*i, currentHeight+27);
            
  
          }
          currentHeight = currentHeight + element.height + padding;
 
          break;
          case 'Results':
            context.beginPath();
        context.rect(0, currentHeight, canvasSize.width, element.height);
        context.fillStyle = "#5D5FEF";
        context.fill();
        context.font = "16px Inter-Medium";
        context.fillStyle = "#ffffff";
        context.textAlign = 'center';
        context.fillText("=", canvasSize.width/2, currentHeight+32);
        currentHeight = currentHeight + element.height +padding;
        break
        case 'Numbers':
          for (let i=0; i<9; i++) {
            context.strokeStyle = "#e2e3e5";
            context.lineWidth = 1;
            context.roundRect(6 + 60*i, currentHeight+4 , 52, 48, 6)
            context.stroke();     
            context.font = "14px Inter-Medium";
            context.fillStyle = "#000000";
            context.fillText(element.data[i], 32 + 60*i, currentHeight+27);
            
  
          }
          currentHeight = currentHeight + element.height + padding;
 
          break;
          
        }     
      }
    }
  //   let element = entities[el  as keyof typeof entities];


  } 

  export const drawLine = (context: CanvasRenderingContext2D | null, height:number, currentHeight:number) => {
    if (context) {

      context.beginPath();
      context.strokeStyle = "#5d5fef";
      context.lineWidth = 2;
      context.moveTo(0, currentHeight+height+padding);  
      context.lineTo(canvasSize.width, currentHeight+height+padding)
      context.stroke();

      

    }
   
  }



