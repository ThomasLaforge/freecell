import { Game } from './Game'
import * as _ from 'lodash'

export class GameStateManager {

    private slots: Game[];

    constructor(game: Game){
        this.slots = [ this.clone(game) ]
    }

    addSlot(gameState: Game){
        if(!_.isEqual(this.currentSlot, gameState)){
            this.slots.push(this.clone(gameState));
        }
    }

    canUndo(){
        this.slots.length > 1
    }

    undo(){
        if(this.canUndo()){
            this.slots.pop()
        }
    }

    clone(obj: any) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    get currentSlot(){
        return this.slots[this.slots.length - 1]
    }


}