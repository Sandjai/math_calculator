import DropIcon from "../assets/images/drop.png";
import {canvasSize} from '../components/constants/canvasSize'
import { elements, elementsData, entities, generalPadding } from "../components/constants/elementsSettings";
import { Ibutton, IdrawElements } from "../types/data";
let padding = generalPadding;

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

  let drawButton:Ibutton = function (context, i, element, currentHeight, w, h, shift, txtShift, ) {
    context.strokeStyle = "#e2e3e5";
    context.lineWidth = 1;
    context.roundRect(6 + shift*(i%element.columns), currentHeight+4 , w, h, 6)
    context.stroke();     
    context.font = "14px Inter-Medium";
    context.fillStyle = "#000000";
    
    context.fillText(element.data[i], txtShift + shift*(i%element.columns), currentHeight+27);
  
  }

  export const drawElements:IdrawElements = (context, inCanvas, activeEl, clickedOn, value) => {
if (clickedOn) {
  console.log(clickedOn);
}
let elList = [...inCanvas];
if (!clickedOn && activeEl) {

  (activeEl === 'Display') ? elList.unshift(activeEl) : elList.push(activeEl);
  

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
        let val = "0";
        if(value) {
          val=value;
        }
        context.fillText(val, canvasSize.width-20, currentHeight+32);
        currentHeight = currentHeight + element.height + padding;
        
        break;
        case 'Operations':
          for (let i=0; i<element.data.length; i++) {
            drawButton(context, i, element, currentHeight, 52, 48, 60, 32); 
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
          let height = currentHeight;
          for (let i=0; i<3; i++) {
            drawButton(context, i, element, height, 71, 48, 80, 42);   
          }          
          height = height + 58;
          for (let i=3; i<6; i++) {
            drawButton(context, i, element, height, 71, 48, 80, 42);   
          }     
          height = height + 58;          
          for (let i=6; i<9; i++) {
            drawButton(context, i, element, height, 71, 48, 80, 42);   
          }   
          height = height + 58;          
          for (let i=9; i<10; i++) {
            drawButton(context, i, element, height, 150, 48, 80, 84);   
          }   
          
            drawButton(context, 10, element, height, 71, 48, 160, 42); 
              
  
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



