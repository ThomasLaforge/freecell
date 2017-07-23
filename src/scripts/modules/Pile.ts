import { Card } from './Card'
import { PlayableZone } from './Freecell'

export class Pile implements PlayableZone {

    public value: number;

    constructor(value = 0){
        this.value = value
    }

    addCard(c: Card | Card[]){
        let card = Array.isArray(c) ? c : [c]
        card.forEach( card => {
            if(card.value === this.value + 1){
                this.value++
            }
            else {
                throw 'can\'t add this card on this pile'
            }
        })
    }
}