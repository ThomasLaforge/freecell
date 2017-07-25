// imports
    import { Card }         from './Card';
    import { Deck }         from './Deck';
    import { Field }        from './Field';
    import { Pile }         from './Pile';
    import { Piles }        from './Piles';
    import { GameStateManager }        from './GameStateManager';
    import { FreeCells, FreeCell }    from './FreeCells';
    import { Column }       from './Column';
    import { Selection }       from './Selection';
    import { Timer }        from './Timer';
    import { NB_COLUMN, NB_FREE_CELLS, NB_PILE } from './Freecell';
    import { Statistics }   from './Statistics'
// -------

export class Game {

    private _timer: Timer;
    private _deck: Deck;
    private _statistics: Statistics;
    private _field: Field;
    private _piles: Piles;
    private _freeCells: FreeCells;
    private _gameStateManager: GameStateManager

	constructor(deck = new Deck(), field = new Field(), piles = new Piles(), freeCells = new FreeCells(), timer = new Timer(), autostart = false, statistics = new Statistics() ) {
        this.deck = deck;
        this.field = field;
        this.piles = piles;
        this.freeCells = freeCells;
        this.statistics = statistics;
        this.timer = new Timer();
        this.gameStateManager = new GameStateManager(this)
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

    autoPlay(card: Card, from: Column | FreeCell){
        // Find where
        let to: FreeCell | Pile | Column

        // Pile
        let p = this.piles.getPile(card.family)
        if(p.isCardPlayable(card)){
            to = p
        }

        // Column
        if(!to){
            for(let i = 0; i < this.field.columns.length; i++){
                let col = this.field.columns[i]
                if(col.isCardPlayable(card)){
                    to = col
                    break;
                }
            }
        }

        // FreeCell
        if(!to){
            for(let i = 0; i < this.freeCells.freeCells.length; i++){
                let f = this.freeCells.freeCells[i]
                if(!f.card){
                    to = f
                    break;
                }
            }
        }

        if(to){
            this.play(card, from, to)
        }
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
            toPileOk = to.isCardPlayable(card)
        }
        else if(to instanceof FreeCell){
            toFreeCellOk = to.isCardPlayable();
        }
        else if(to instanceof Column){
            let nbCardsToDrag = cards.length
            let selectionDragged = new Selection(cards)
            let topCard = cards[0]
            let dragPossible = nbCardsToDrag <= this.getNbFreeSpacesFromFreecells() + 1
            // TODO : Need to care of field free spaces
            toColumnOk = to.isCardPlayable(topCard) && dragPossible;
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

        this.gameStateManager.addSlot(this)

        return controlsOk
    }

    undo(){
        this.gameStateManager.undo();
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

    isGameOver(){
        let isGameOver = true;
        // free cell available
        this.freeCells.freeCells.forEach( f => {
            if(!f.card) {
                isGameOver = false;
            }
        })
        
        // Can play free cell on field
        if(isGameOver) {
            this.freeCells.freeCells.forEach( f => {
                this.field.columns.forEach(c => {
                    if(c.isCardPlayable(f.card)){
                        isGameOver = false
                    }
                })
            })        
        }
        // Can play free cell on pile
        if(isGameOver) {
            this.freeCells.freeCells.forEach( f => {
                this.piles.piles.forEach(p => {
                    if(p.isCardPlayable(f.card)){
                        isGameOver = false
                    }
                })
            })      
        }

        // Can play field on pile
        if(isGameOver) {        
            this.field.columns.forEach(c => {
                this.piles.piles.forEach(p => {
                    if( p.isCardPlayable(c.bottomCard) ){
                        isGameOver = false
                    }
                })
            })
        }
        
        // can play field on field
        if(isGameOver) {
            this.field.columns.forEach( cDrag => {
                this.field.columns.forEach( cDrop => {
                    if( cDrop.isCardPlayable(cDrag.bottomCard) ){
                        isGameOver = false
                    }
                })
            })
        }
        
        return isGameOver
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
    public get statistics(): Statistics {
		return this._statistics;
	}
	public set statistics(value: Statistics) {
		this._statistics = value;
    }
    public get gameStateManager(): GameStateManager {
		return this._gameStateManager;
	}
	public set gameStateManager(value: GameStateManager) {
		this._gameStateManager = value;
	}

//------------------- 

}