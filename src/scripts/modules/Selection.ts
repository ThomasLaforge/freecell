import { Card } from './Card'
import { getInversedColor } from './Freecell'

export class Selection {

    public cards: Card[]

    constructor(cards: Card[]){
        this.cards = cards
    }

    get length(){
        return this.cards.length
    }

    isStriped(){
        let i = this.length - 1
        while (i > 0 && this.cards[i - 1].color !== this.cards[i].color) {
            i--
        }
        return i === 0
    }

    isPyramid(){
        let i = this.length - 1
        while (i > 0 && this.cards[i - 1].value === this.cards[i].value + 1) {
            i--
        }
        return i === 0
    }

    isDraggable(){
        return this.isStriped() && this.isPyramid()
    }

}