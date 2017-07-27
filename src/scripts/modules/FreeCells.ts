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

    removeCard( card:Card | Card[]) {
        this.card = null;
    }

    isCardPlayable(){
        return !this.card
    }

    getPlayableCard(){
        return this.card
    }
}

export class FreeCells {

    public freeCells: FreeCell[]
    
    constructor(freeCells?: FreeCell[]){
        if(!freeCells){
            let initialFreeCells: FreeCell[] = [];
            for (let i = 0; i < NB_FREE_CELLS; i++) {
                initialFreeCells.push(new FreeCell())
            }
            this.freeCells = initialFreeCells
        }
        else{
            this.freeCells = freeCells
        }
    }

    getNbFree(){
        return this.freeCells.filter( f => { return !f.card }).length
    }
}