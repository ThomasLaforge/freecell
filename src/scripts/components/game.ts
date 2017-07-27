import { pile } from './pile'
import { field } from './field'
import { freecell } from './freecell'
import { modal } from './modal'
import { Column } from '../modules/Column'
import { Pile } from '../modules/Pile'
import { FreeCell } from '../modules/FreeCells'
import { Card } from '../modules/Card'
import { Game } from '../modules/Game'
import { Deck } from '../modules/Deck'
import { Piles } from '../modules/Piles'
import { Field } from '../modules/Field'
import { Timer } from '../modules/Timer'
import { FreeCells } from '../modules/FreeCells'

let template = `
<div class="game">
    <button @click="reset">{{ playAgainTxt }}</button>

    <div class="game-top">
        <div class="piles">
            <pile v-for="(p, i) in piles" 
                :pile="p" 
                :key="i"
                @addCard="addCardToPile"                
            /> 
        </div>
        
        <button @click="undo" :disabled="!canUndo">Undo</button>

        <div class="freecells">
            <freecell v-for="(f, i) in freeCells" 
                :freeCell="f" 
                :key="i"
                @addCard="addCardToFreeCell" 
                @dragCard="cardDraggedFromFreeCell"
                @cardDoubleClicked="handleDoubleClickedCardOnFreeCell"
            />
        </div>
    </div>

    <field 
        :columns="columns" 
        @addCard="addCardToField" 
        @dragCard="cardDraggedFromField"
        @cardDoubleClicked="handleDoubleClickedCardOnColumn"        
    />

    <modal :show="showPopup" @onClose="closePopup">
        <div class="popup-title">{{ popupTitle }}</div>
        <button @click="reset">{{ playAgainTxt }}</button>
    </modal>

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
        canUndo: function(){ return this.game.gameStateManager && this.game.gameStateManager.canUndo() },
        showPopup: function(){ return this.game.isGameOver() || this.game.isWon() },
        popupTitle: function(){ return this.game.isWon() ? 'You won this game !' : 'You lost this game...'},
        playAgainTxt: function(){ return this.game.isWon() ? 'Restart' : 'Try again'},
        piles: function(){ return this.game.piles.piles},
        freeCells: function(){ return this.game.freeCells.freeCells},
        columns: function(){ return this.game.field.columns }
    },
    components : {
        pile,
        freecell,
        field,
        modal
    },
    methods: {
        cardDraggedFromField: function(card: Card, col: Column){
            // console.log('cardDragged from field')
            this.dragStartColumn = col;
            this.cardDraggedFromColumn = card
        },
        cardDraggedFromFreeCell: function(freeCell: FreeCell){
            // console.log('cardDragged from freeCell', freeCell)
            this.dragStartFreeCell = freeCell;
        },
        addCardToField(column: Column){
            // console.log('UI:game:addCardToField',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, column, this.cardDraggedFromColumn)
            if(this.dragStartColumn || this.dragStartFreeCell ){
                this.game.play(this.cardDraggedFromColumn, this.dragStartColumn || this.dragStartFreeCell, column);
                this.resetDraggedElt()
            }
        },
        addCardToFreeCell(freeCell: FreeCell, card: Card){
            // console.log('UI:game:addCardToFreeCell',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, freeCell, card)
            if(this.dragStartColumn || this.dragStartFreeCell){
                this.game.play(card, this.dragStartColumn || this.dragStartFreeCell, freeCell);
                this.resetDraggedElt()         
            }
        },
        addCardToPile(pile: Pile){
            // console.log('UI:game:addCardToFreeCell',this.dragStartColumn || this.dragStartFreeCell, this.dragStartColumn, this.dragStartFreeCell, pile, this.cardDraggedFromColumn)            
            if(this.dragStartColumn || this.dragStartFreeCell){
                this.game.play(this.cardDraggedFromColumn, this.dragStartColumn || this.dragStartFreeCell, pile);
                this.resetDraggedElt()         
            }
        },
        handleDoubleClickedCardOnColumn(card: Card, col: Column){
            // console.log('handleDoubleClickedCardOnColumn', card, col)
            this.game.autoPlay(card, col)
        },
        handleDoubleClickedCardOnFreeCell(card: Card, freeCell: FreeCell){
            // console.log('handleDoubleClickedCardOnFreeCell', card, freeCell)
            this.game.autoPlay(card, freeCell)            
        },
        resetDraggedElt(){
            this.dragStartColumn = null;                
            this.dragStartFreeCell = null;
            this.cardDraggedFromColumn = null;
        },
        undo(){
            console.log('UI:undo')
            this.game.undo();
        },
        closePopup(){
            console.log('method call closePopup')
        },
        reset(){
            this.$emit('reset')
        }
    }
};
