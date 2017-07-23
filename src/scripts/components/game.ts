import { pile } from './pile'
import { field } from './field'
import { freecell } from './freecell'
import { Column } from '../modules/Column'
import { Card } from '../modules/Card'

let template = `
<div class="game">
    <div class="game-top">
        <div class="piles">
            <pile v-for="(p, i) in game.piles.piles" 
                :value="p.value" 
                :family="i" 
                :key="i" 
            /> 
        </div>
        
        <div class="freecells">
            <freecell v-for="(f, i) in game.freeCells.freeCells" 
                :freecell="f.card" 
                :key="i" 
            />
        </div>
    </div>

    <field 
        :columns="game.field.columns" 
        @addCard="addCardToField" 
        @dragCarg="cardDraggedFromField"
    />
</div>
`

export const game = {
    props : ['game'],
    template : template,
    data: function(): { dragStartColumn: Column } {
        return {
            dragStartColumn: null
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
            console.log('cardDragged on game')
            this.dragStartColumn = col;
        },
        cardDroppedFromField: function(){
            this.dragStartColumn = null;
        },
        addCardToField(column: Column, card: Card){
            console.log('if is drag start column')
            if(this.dragStartColumn){
                console.log('game.play')
                this.game.play(card, this.dragStartColumn, column);
            }
        }
    }
};
