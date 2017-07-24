import { Pile } from './Pile'
import { NB_PILE, CardFamily } from './Freecell'

let initialPiles: Pile[] = [];
for (let i = 0; i < NB_PILE; i++) {
    initialPiles.push(new Pile(i))
}

export class Piles {

    private _piles: Pile[]

    constructor(piles = initialPiles){
        this.piles = piles
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