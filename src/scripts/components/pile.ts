import { getFamilySymbole, getFamilyChar } from '../modules/Freecell'
import { Card } from '../modules/Card'
import { card } from './card'

let template = `
<div class="pile"
    @dragover.prevent
    @drop="onDropCard"
    @dragenter="onDragEnterCard"
>
    <div v-if="pile && pileValue > 0">
        <card 
            :card="card"
            :isDraggable="false" 
        />
    </div>
    <div v-if="pile && pileValue === 0" v-html="familySymbole" :class="familyColorClass" />

</div>
`

export const pile = {
    props : ['pile'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
        familySymbole : function(){ return getFamilySymbole(this.pile.family) },
        familyColorClass : function(){ return 'pile-empty-' + this.card.colorTextLowerCase },
        card: function() { return new Card(this.pile.value, this.pile.family) },
        pileValue: function(){ return this.pile.value }        
    },
    components : {
        card
    },
    methods: {
        onDropCard: function(e: Event){
            this.$emit('addCard', this.pile)
        },
        onDragEnterCard: function(){
            // console.log('dragenter', col)
        },
    }
};
