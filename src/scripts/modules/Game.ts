// imports
    import { Card }         from './Card';
    import { Deck }         from './Deck';
    import { Field }        from './Field';
    import { Pile }         from './Pile';
    import { Piles }        from './Piles';
    import { FreeCells, FreeCell }    from './FreeCells';
    import { Column }       from './Column';
    import { Selection }       from './Selection';
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

        
    play(card: Card, from?: FreeCell | Column, to?: Pile | FreeCell | Column){
        /**
         * Controls
         */
        console.log('Game:play', card, from, to)
        let cards = from instanceof Column ? from.getSelectionFromCard(card).cards : [ from.card ]
        console.log('Game:play - cards', cards)

        /**
         * liste des cas
         * 
         * card: card or selection ---> Selection must be in order / valid
         * from :   - freecell : one card
         *          - Column : multiple card
         * to :     - Pile : one card
         *          - Column: mulitple card with card to put is one less value and not same color than bottom card of column
         *          - Freecell: one card
         * 
         */

        let fromOk = cards.length === 1 || (to instanceof Column && new Selection(cards).isDraggable())
        let toPileOk = false;
        let toFreeCellOk = false;
        let toColumnOk = false;

        if(to instanceof Pile){
            let card = cards[0]
            toPileOk = card.value === to.value + 1 && card.family === to.family         
        }
        else if(to instanceof FreeCell){
            toFreeCellOk = !to.card;
        }
        else if(to instanceof Column){
            let nbCardsToDrag = cards.length
            let selectionDragged = new Selection(cards)
            let topCard = cards[0]
            let dragPossible = nbCardsToDrag <= this.getNbFreeSpacesFromFreecells() + 1
            // TODO : Need to care of field free spaces
            toColumnOk = topCard.color !== to.bottomCard.color && topCard.value === to.bottomCard.value - 1 && dragPossible;
        }

        let toOk = toPileOk || toFreeCellOk || toColumnOk;
        let controlsOk = fromOk && toOk;

        if( controlsOk ) {
            try {
                to.addCard(cards)
                from.removeCard(cards);
            }
            catch(err){
                console.log('error on play')
                controlsOk = false;
            }
        }

        return controlsOk
    }

    removeCards(c: Card | Card[], from: Pile | FreeCell | Column){
        let cards = Array.isArray(c) ? c : [c]
        cards.forEach( card => {

        })
    }

    getNbFreeSpaces(){
        return this.getNbFreeSpacesFromFreecells() + this.getNbFreeSpacesFromField();
    }
    getNbFreeSpacesFromFreecells(){
        return this.freeCells.getNbFree() 
    }
    getNbFreeSpacesFromField(){
        return this.field.getNbFree()
    }

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