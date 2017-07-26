import { Card } from './Card'
import { PlayableZone, DraggableZone } from './Freecell'
import { CardFamily } from './Freecell'

export class Pile implements PlayableZone, DraggableZone {

    public value: number;
    public family: CardFamily;

    constructor(family: CardFamily, value = 0){
        this.value = value
        this.family = family
    }

    addCard(c: Card | Card[]){
        let card = Array.isArray(c) ? c : [c]
        card.forEach( card => {
            if(card.value === this.value + 1){
                this.value = card.value
            }
            else {
                throw 'can\'t add this card on this pile'
            }
        })
    }

    isCardPlayable(card: Card){
        return card.value === this.value + 1 && card.family === this.family
    }

    getPlayableCard(){
        return new Card(this.value, this.family)
    }

    removeCard(card: Card | Card[]){
        this.value--
    }
}