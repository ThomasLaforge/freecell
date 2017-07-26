import { Card } from './Card'
import { NB_FREE_CELLS, DraggableZone, PlayableZone } from './Freecell'

export class FreeCell implements DraggableZone, PlayableZone {
    public card: Card;

    constructor(card: Card = null){
        this.card = card
    }
    
    addCard(c:Card | Card[]){
        console.log('FreeCell:addCard', c)
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {
            this.card = card;
            console.log('card replaced', card, this.card)
        })
    }

    removeCard( card:Card | Card[]) {
        this.card = null;
    }

    isCardPlayable(){
        return !this.card
    }
}

let initialFreeCells: FreeCell[] = [];
for (let i = 0; i < NB_FREE_CELLS; i++) {
    initialFreeCells.push(new FreeCell())
    
}

export class FreeCells {

    public freeCells: FreeCell[]
    
    constructor(freeCells = initialFreeCells ){
        this.freeCells = freeCells
    }

    getNbFree(){
        return this.freeCells.filter( f => { return !f.card }).length
    }
}