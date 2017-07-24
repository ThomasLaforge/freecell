import { card } from './card'
import { Card } from '../modules/Card'

let template = `
<div class="freecell"
    @dragover.prevent
    @drop="onDropCard"
    @dragenter="onDragEnterCard"
>    
    <card v-if="freeCell.card" 
        :card="freeCell.card"
        :isDraggable="true"
        @cardDragged="sendCardDragged(freeCell.card)"
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
        }
    }
};
