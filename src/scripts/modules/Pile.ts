import { Card } from './Card'
import { PlayableZone } from './Freecell'
import { CardFamily } from './Freecell'

export class Pile implements PlayableZone {

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
                console.log('add on pile')
                this.value = card.value
            }
            else {
                throw 'can\'t add this card on this pile'
            }
        })
    }
}