import { Card } from './Card'
import { Deck } from './Deck'
import { Selection } from './Selection'
import { getInversedColor, DraggableZone, PlayableZone } from './Freecell'

export class Column implements DraggableZone, PlayableZone {

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

    removeCard( c:Card | Card[] ) {
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {
            let pos = this.cards.indexOf( card );
            if(pos > -1){
                this.cards.splice(pos, 1);
            }
            else{
                console.log('Tentative de suppression d\'une carte qui n\'est pas présente dans la main');
            }
        })
    }

    getSelectionFromCard(card: Card){
        let cardPosition = this.cards.indexOf(card)
        let cardAndCardsUnder = this.cards.slice(cardPosition);
        return new Selection(cardAndCardsUnder);
    }

    isCardDraggable( card: Card ) {
        let selection = this.getSelectionFromCard(card);
        return selection.isDraggable();
    }

    isCardPlayable( card: Card ){
        return card.value + 1 === this.bottomCard.value && card.color === getInversedColor(this.bottomCard.color)
    }

    get bottomCard(){
        return this.cards[this.length() - 1]
    }

    public get cards(): Card[] {
        return this._cards
    }
    public set cards(cards: Card[]) {
        this._cards = cards
    }
}