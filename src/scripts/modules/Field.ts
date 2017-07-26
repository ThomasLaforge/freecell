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

    getNbColumnEmpty(){
        return this.columns.filter( c => c.isEmpty() ).length
    }

    importFromJson(json: any){
        this.columns.forEach( (c, i) => {

        })
    }

    getColumn(index: number){
        return this.columns[index]
    }

    getNbColumn() {
        return this.columns.length
    }

    getNbFree(){
        return this.columns.filter( c => { return c.length() === 0 }).length
    }

    public get columns(){
        return this._columns
    }

}