// imports
    import { Card }         from './Card';
    import { Deck }         from './Deck';
    import { Field }        from './Field';
    import { Pile }         from './Pile';
    import { Piles }        from './Piles';
    import { FreeCells, FreeCell }    from './FreeCells';
    import { Column }       from './Column';
    import { Timer }        from './Timer';
    import { NB_COLUMN, NB_FREE_CELLS, NB_PILE } from './Freecell';
    import { HighScores }   from './HighScores'
// -------

export class Game {

    private _timer: Timer;
    private _deck: Deck;
    private _highscores: HighScores;
    private _field: Field;
    private _piles: Piles;
    private _freeCells: FreeCells;

	constructor(deck = new Deck(), field = new Field(), piles = new Piles(), freeCells = new FreeCells(), timer = new Timer(), autostart = false, highscores = new HighScores() ) {
        this.deck = deck;
        this.field = field;
        this.piles = piles;
        this.freeCells = freeCells;
        this.highscores = new HighScores()
        this.timer = new Timer();
        if(autostart){ this.start() }
    }

    // State //
    start(){
        this.timer.start();
    }

    init(){
        this.deck.cards.forEach( (card, i) => {
            this.field.getColumn( i % this.field.getNbColumn() ).addCard( card )
        })
    }

        
    play(card: Card, from?: Pile | FreeCell | Column, to?: Pile | FreeCell | Column){
        // let pile = this.piles.getPile(card.family)
        // let pileValue = pile.value
        // if(card.value === pileValue + 1){
        //     pile.addCard(card);
        // }
        // this.removeCards(card);
        from.removeCards(card);
        to.addCard(card)
    }

    removeCards(c: Card | Card[], from: Pile | FreeCell | Column){
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {

        })
    }

    moveCard(card: Card, to: Column){}

// Getters / Setters
	public get field(): Field {
		return this._field;
	}
	public set field(value: Field) {
		this._field = value;
    }
    public get freeCells(): FreeCells {
		return this._freeCells;
	}
	public set freeCells(value: FreeCells) {
		this._freeCells = value;
    }
    public get piles(): Piles {
		return this._piles;
	}
	public set piles(value: Piles) {
		this._piles = value;
	}
	public get timer(): Timer {
		return this._timer;
	}
	public set timer(value: Timer) {
		this._timer = value;
    }
	public get deck(): Deck {
		return this._deck;
	}
	public set deck(value: Deck) {
		this._deck = value;
	}
    public get highscores(): HighScores {
		return this._highscores;
	}
	public set highscores(value: HighScores) {
		this._highscores = value;
	}

//------------------- 

}