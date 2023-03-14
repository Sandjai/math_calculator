
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

export interface IelementsData {
  Display: string[];
  Operations: string[];
  Numbers: string[];
  Results: string[];
  [key: string]: string[];
  }  