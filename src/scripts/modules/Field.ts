import { Column } from './Column'
import { NB_COLUMN } from './Freecell'

export class Field {

    private _columns: Column[];

    constructor(columns?: Column[]){
        if(!columns){
            let cols = [];
            for (let i = 0; i < NB_COLUMN; i++) {
                cols.push(new Column());
            }
            this._columns = cols;
        }
        else {
            this._columns = columns; 
        }
    }

    getColumn(index: number){
        return this.columns[index]
    }

    getNbColumn() {
        return this.columns.length
    }

    public get columns(){
        return this._columns
    }

}