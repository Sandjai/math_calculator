import { IelementsData, IelementsSettings } from "../../types/data";
import { canvasSize } from "./canvasSize";


export const elementsData:IelementsData = {
    Display: ['0'],
    Operations: ['/', 'X', '-', '+'],
    Numbers: ['7', '8', '9', '4','5', '6', '1', '2','3', '0', ','],
    Results: ['='],
    }  
    
export const generalPadding = 10;
export const entities = {
    Display: { width: +canvasSize,
        height: 60,      
        rows: 1,
        columns: 1,
        data: elementsData.Display},
    Operations: { width: +canvasSize,
        height: 56,       
        rows: 1,
        columns: 4,
        data: elementsData.Operations,},
    Numbers: {
        width: +canvasSize,
        height: 224,       
        rows: 4,
        columns: 3,
        data: elementsData.Numbers,
    },
    Results: {
        width: +canvasSize,
        height: 71,      
        rows: 1,
        columns: 1,
        data: elementsData.Results
    },
    }




export const elements:Array<IelementsSettings> = [{
    width: +canvasSize,
    height: 60,
    id:"Display",
    rows: 1,
    columns: 1,
    data: elementsData.Display,
},
{
    width: +canvasSize,
    height: 56,
    id:"Operations",
    rows: 1,
    columns: 4,
    data: elementsData.Operations,
},
{
    width: +canvasSize,
    height: 224,
    id:"Numbers",
    rows: 4,
    columns: 3,
    data: elementsData.Numbers,
},
{
    width: +canvasSize,
    height: 72,
    id:"Results",
    rows: 1,
    columns: 1,
    data: elementsData.Results
}]




