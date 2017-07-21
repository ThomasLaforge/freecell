import { Card } from './Card'
import { NB_FREE_CELLS } from './Freecell'

export class FreeCell {
    public card: Card;

    constructor(card: Card = null){
        this.card = card
    }
}

export class FreeCells {

    public freeCells: Card[]
    
    constructor(freeCells = new Array(NB_FREE_CELLS).fill( new FreeCell() )){
        this.freeCells = freeCells
    }
}