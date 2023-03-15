
export interface Imodes {
    runtime: string, 
    constructor: string,
    [key: string]: string
  }
  
export interface IcanvasSizes {
    width: number, 
    height: number,
  }
export interface IelementsSettings{
    id: string,
    width: number,
    height: number,
    rows: number,
    columns: number,
    data: string[]
    }

export interface ICanvasProps {
      className?: string;
    }
    
export interface objArr {
      id: string;
      height: number;
      [key: string]: string | number;
    }
    
export interface Ibreakpoints__width {
      from: number;
      to: number;
    }

export interface Ibreakpoints__width_operations {
  x: {
    from: number;
    to: number;
  }
  y: {
    from: number
    to: number
    }
  }

export interface Ibreakpoints__width_numbers {
  x: {
    from: number;
    to: number;
  }
  y: {
    from: number
    to: number
    }[]
}


export interface IelementsData {
  Display: string[];
  Operations: string[];
  Numbers: string[];
  Results: string[];
  [key: string]: string[];
  }  

 export interface Ibutton {
    (context: CanvasRenderingContext2D, 
      i:number, 
      element:any, 
      currentHeight:number,
      w:number,
      h:number,
      shift: number,
      txtShift:number): void
  }


export  interface IdrawElements {
    (context: CanvasRenderingContext2D | null, 
      inCanvas:string[], 
      activeEl:string | null,
      clickedOn?: string | null,
      value?: string,
      ): void
  }