import { pile } from './pile'
import { field } from './field'
import { freecell } from './freecell'
import { Column } from '../modules/Column'
import { Pile } from '../modules/Pile'
import { FreeCell } from '../modules/FreeCells'
import { Card } from '../modules/Card'

let template = `
<div class="game">
    <div>Game over : {{ game.isGameOver() }}</div>

    <div class="game-top">
        <div class="piles">
            <pile v-for="(p, i) in game.piles.piles" 
                :pile="p" 
                :key="i"
                @addCard="addCardToPile"                
            /> 
        </div>
        
        <div class="freecells">
            <freecell v-for="(f, i) in game.freeCells.freeCells" 
                :freeCell="f" 
                :key="i"
                @addCard="addCardToFreeCell" 
                @dragCard="cardDraggedFromFreeCell"
            />
        </div>
    </div>

    <field 
        :columns="game.field.columns" 
        @addCard="addCardToField" 
        @dragCard="cardDraggedFromField"
    />

</div>
`

export const game = {
    props : ['game'],
    template : template,
    data: function(): { dragStartColumn: Column, cardDraggedFromColumn: Card, dragStartFreeCell: FreeCell } {
        return {
            dragStartColumn: null,
            dragStartFreeCell: null,
            cardDraggedFromColumn: null
        }
    },
    computed : {
    },
    components : {
        pile,
        freecell,
        field
    },
    methods: {
        cardDraggedFromField: function(card: Card, col: Column){
            console.log('cardDragged from field')
            this.dragStartColumn = col;
            this.cardDraggedFromColumn = card
        },
        cardDraggedFromFreeCell: function(freeCell: FreeCell){
            console.log('cardDragged from freeCell', freeCell)
            this.dragStartFreeCell = freeCell;
        },
        addCardToField(column: Column){
            console.log('UI:game:addCardToField',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, column, this.cardDraggedFromColumn)
            if(this.dragStartColumn || this.dragStartFreeCell ){
                this.game.play(this.cardDraggedFromColumn, this.dragStartColumn || this.dragStartFreeCell, column);
                this.resetDraggedElt()
            }
        },
        addCardToFreeCell(freeCell: FreeCell, card: Card){
            console.log('UI:game:addCardToFreeCell',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, freeCell, card)
            if(this.dragStartColumn || this.dragStartFreeCell){
                this.game.play(card, this.dragStartColumn || this.dragStartFreeCell, freeCell);
                this.resetDraggedElt()         
            }
        },
        addCardToPile(pile: Pile){
            console.log('UI:game:addCardToFreeCell',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, pile, this.cardDraggedFromColumn)            
            if(this.dragStartColumn || this.dragStartFreeCell){
                this.game.play(this.cardDraggedFromColumn, this.dragStartColumn || this.dragStartFreeCell, pile);
                this.resetDraggedElt()         
            }
        },
        resetDraggedElt(){
            this.dragStartColumn = null;                
            this.dragStartFreeCell = null;
            this.cardDraggedFromColumn = null;
        }
    }
};
