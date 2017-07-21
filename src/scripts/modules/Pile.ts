import { Card } from './Card'

export class Pile {

    public value: number;

    constructor(value = 0){
        this.value = value
    }

    addCard(card: Card){
        if(card.value === this.value + 1){
            this.value++
        }
        else {
            throw 'can\'t add this card on this pile'
        }
    }
}