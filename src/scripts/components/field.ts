import { column } from './column'
import { Column } from '../modules/Column'
import { Card } from '../modules/Card'

// <column :cards="columns[0].cards"/>

let template = `
<div class="field">
    <column v-for="(col, i) in columns"
        :key="i" 
        :column="col"
        @dropCard="drop(col)"
        @cardDragged="dragCard"
        @cardDoubleClicked="(card) => { handleCardDoubleClicked(card, col) }"
    />
</div>
`

export const field = {
    props : ['columns'],
    template : template,
    data: function() : { draggedCard: Card } {
        return {
            draggedCard : null
        }
    },
    computed : {
    },
    components : {
        column
    },
    methods: {
        dragCard: function(card: Card, col: Column){ 
            this.draggedCard = card
            this.$emit('dragCard', card, col)
        },
        drop: function(col: Column){
            console.log('drop', col)
            this.$emit('addCard', col)
        },
        dragenter: function(col: Column){
            console.log('dragenter', col)
        },
        handleCardDoubleClicked(card: Card, col: Column){
            this.$emit('cardDoubleClicked', card, col)
        }
    }
};
