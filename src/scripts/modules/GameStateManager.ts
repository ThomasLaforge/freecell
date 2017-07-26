import { Game } from './Game'
import { Pile } from './Pile'
import { FreeCell } from './FreeCells'
import { Column } from './Column'
import * as _ from 'lodash'

export class Operation {

    private from: Column | FreeCell | Pile;
    private fromChar: string;
    private to: Column | FreeCell | Pile;
    private toChar: string;
    private game: Game;

    constructor(game: Game, from: Column | FreeCell | Pile, to: Column | FreeCell | Pile ){
        this.game = game;
        this.from = from;
        this.fromChar = this.getOperationChar(from);
        this.to = to
        this.toChar = this.getOperationChar(to);
    }

    getOperationCode(){
        return this.fromChar + this.toChar
    }

    getReverseOperation(){
        return new Operation(this.game, this.to, this.from)
    }
    
    getOperationChar( where: Column | FreeCell | Pile ) : string {
        let char;
        if(where instanceof Column){
            return String.fromCharCode(this.game.field.columns.indexOf(where) + 49);
        }
        else if(where instanceof Pile){
            return String.fromCharCode( this.game.piles.piles.indexOf(where) + 65 )
        }
        else if(where instanceof FreeCell){
            return String.fromCharCode( this.game.freeCells.freeCells.indexOf(where) + 97 )
        }

        return char;
    }
    getObjectFromOperationChar(char: string) : Column | FreeCell | Pile {
        let charCode = char.charCodeAt(0);
        let index;
        console.log('charCode', charCode)
        if(charCode < 65){
            index = charCode - 49
            return this.game.field.getColumn(index)
        }
        else if(charCode < 97){
            index = charCode - 65
            return this.game.piles.getPile(index)
        }
        else{
            index = charCode - 97
            return this.game.freeCells.freeCells[index]
        }
    }

    exec(){
        return this.game.play(this.from.getPlayableCard(), this.from, this.to, true)
    }

}

export class GameStateManager {

    private slots: Operation[];
    public game: Game;

    constructor(game: Game){
        this.game = game
        this.slots = []
    }

    addSlot(from: Pile | Column | FreeCell, to: Column | FreeCell | Pile){
        this.slots.push(new Operation(this.game, from, to));
        console.log('new operation', this.slots[this.slots.length - 1].getOperationCode())
    }
    addOperation(operation: Operation){
        this.slots.push(operation)
    }

    canUndo(){
        return this.slots.length > 0
    }

    undo(){
        if(this.canUndo()){
            let previousOperation = this.slots.pop()
            let undoOperation = previousOperation.getReverseOperation()
            if(!undoOperation.exec()){
                console.log('roll back undo')
                this.addOperation(previousOperation)
            }
        }
    }

    get currentSlot(){
        return this.slots[this.slots.length - 1]
    }


}