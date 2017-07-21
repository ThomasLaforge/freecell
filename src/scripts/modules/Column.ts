import { Card } from './Card'
import { Deck } from './Deck'

export class Column {

    public _cards: Card[]

    constructor(cards: Card[] = []){
        this.cards = cards
    }

        // States of arrays : deck and discard
    isEmpty(){
        return this.cards.length <= 0;
    }

    length(){
        return this.cards.length;
    }

    addCard(c:Card | Card[]){
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {
            this.cards.push(card);
        })
    }

    removeCard( card:Card ) {
        let pos = this.cards.indexOf( card );
        if(pos > -1){
            this.cards.splice(pos, 1);
        }
        else{
            console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
        }
    }

    public get cards(): Card[] {
        return this._cards
    }
    public set cards(cards: Card[]) {
        this._cards = cards
    }
}