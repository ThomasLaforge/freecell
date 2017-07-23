import { card } from './card'
import { Card } from '../modules/Card'

let template = `
<div class="column"
    @dragover.prevent 
    @drop="(e) => { onDropCard(e, column) }" 
    @dragenter="(e) => { onDragEnterCard(e, column) }" 
>
    <card v-for="(card, i) in column.cards" 
        :key="i" 
        :card="card"
        :isDraggable="isCardDraggable(card)"
        @cardDragged="sendCardDragged(card)"
    />
</div>
`

export const column = {
    props : ['column'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
    },
    components : {
        card
    },
    methods: {
        isCardDraggable: function(card: Card){ return this.column.isCardDraggable(card) },
        onDropCard: function(e: Event){
            this.$emit('dropCard')
        },
        onDragEnterCard: function(){
            // console.log('dragenter', col)
        },
        sendCardDragged: function(card: Card){
            this.$emit('cardDragged', card, this.column)
        }
    }
};
