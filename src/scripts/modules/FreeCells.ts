import { Card } from './Card'
import { NB_FREE_CELLS, DraggableZone, PlayableZone } from './Freecell'

export class FreeCell implements DraggableZone, PlayableZone {
    public card: Card;

    constructor(card: Card = null){
        this.card = card
    }

    addCard(c:Card | Card[]){
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {
            this.card = card;
        })
    }

    removeCard( card:Card ) {
        this.card = null;
    }
}

export class FreeCells {

    public freeCells: Card[]
    
    constructor(freeCells = new Array(NB_FREE_CELLS).fill( new FreeCell() )){
        this.freeCells = freeCells
    }
}