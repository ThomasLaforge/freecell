import { card } from './card'
import { Card } from '../modules/Card'

let template = `
<div class="freecell"
    @dragover.prevent
    @drop="onDropCard"
    @dragenter="onDragEnterCard"
>    
    <card v-if="card" 
        :card="card"
        :isDraggable="true"
        @cardDragged="sendCardDragged"
        @cardDoubleCkicked="handleCardDoubleCkicked"
    />
</div>
`

export const freecell = {
    props : ['freeCell'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
        card: function(){ return this.freeCell.card}
    },
    components : {
        card
    },
    methods: {
        onDropCard: function(e: Event){
            this.$emit('addCard', this.freeCell)
        },
        onDragEnterCard: function(){
            // console.log('dragenter', col)
        },
        sendCardDragged: function(){
            this.$emit('dragCard', this.freeCell)
        },
        handleCardDoubleCkicked: function(card: Card){
            this.$emit('cardDoubleClicked', this.freeCell.card, this.freeCell)
        }
    }
};
