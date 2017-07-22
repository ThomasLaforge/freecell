import { card } from './card'
import { Card } from '../modules/Card'

let template = `
<div class="column">
    <card v-for="(card, i) in column.cards" 
        :key="i" 
        :card="card"
        :isDraggable="isCardDraggable(card)"
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
        isCardDraggable: function(card: Card){ return this.column.isCardDraggable(card) }
    }
};
