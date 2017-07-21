import { Pile } from './Pile'
import { NB_PILE, CardFamily } from './Freecell'

export class Piles {

    private _piles: Pile[]

    constructor(piles = new Array(NB_PILE).fill(new Pile(0))){
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