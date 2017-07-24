import * as _ from 'lodash';
import { Card } from './Card'

export class Deck {

    private _cards : Card[]

    constructor( cards: Card[] = []) {
        this.cards = cards;
        if(cards.length === 0){
            for(let value = 1; value < 14; value++ ){
                for(let color = 0; color < 4; color++){
                    this.cards.push( new Card(value, color) )
                }
            }
            this.shuffle()
            // this.cards.reverse()
        }
    }

    // States of arrays : deck and discard
    isEmpty(){
        return this.cards.length <= 0;
    }

    length(){
        return this.cards.length;
    }

    shuffle(){
        this.cards = _.shuffle( this.cards );
    }

    addCard(c:Card | Card[]){
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {
            this.cards.push(card);
        })
    }

    // Missing control if empty
    drawCards( nbCards = 1 ){
        let res: Card[] = [];
        for( let i=0; i < nbCards; i++ ){
            if(this.cards.length > 0){
                res.push( this.drawOneCard() );
            }
        }

        return res;
    }

    drawOneCard(){
        let res:any = null;

        if ( !this.isEmpty() ) {
            res = this.cards[0];
            this.cards.splice( 0, 1 );
        }
        else {
          throw new Error('No more cards in this deck');
        }

        return res;
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