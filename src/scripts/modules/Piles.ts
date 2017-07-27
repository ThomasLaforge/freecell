import { Pile } from './Pile'
import { NB_PILE, CardFamily } from './Freecell'

export class Piles {

    private _piles: Pile[]

    constructor(piles?: Pile[]){
        if(!piles){
            let initialPiles: Pile[] = [];
            for (let i = 0; i < NB_PILE; i++) {
                initialPiles.push(new Pile(i))
            }
            this.piles = initialPiles;
        }
        else {
            this.piles = piles
        }
    }

    getPile(cardFamily: CardFamily){
        return this.piles[cardFamily]
    }

    get piles(){
        return this._piles
    }
    set piles(piles: Pile[]){
        this._piles = piles
    }

}