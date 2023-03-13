import { IelementsSettings } from "../../types/data";
import { canvasSize } from "./canvasSize";


export const elementsEntities = {
    display: ['0'],
    operations: ['/', 'X', '-', '+'],
    numbers: ['7', '8', '9', '4','5', '6', '1', '2','3', '0', ','],
    results: ['='],
    }
    
    

export const elements:Array<IelementsSettings> = [{
    width: +canvasSize,
    height: 60,
    id:"Display",
    rows: 1,
    columns: 1,
    data: elementsEntities.display,
},
{
    width: +canvasSize,
    height: 56,
    id:"Operations",
    rows: 1,
    columns: 4,
    data: elementsEntities.operations,
},
{
    width: +canvasSize,
    height: 224,
    id:"Numbers",
    rows: 4,
    columns: 3,
    data: elementsEntities.numbers,
},
{
    width: +canvasSize,
    height: 72,
    id:"Results",
    rows: 1,
    columns: 1,
    data: elementsEntities.results
}]




