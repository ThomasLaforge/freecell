import { getFamilySymbole, getFamilyChar } from '../modules/Freecell'
import { Card } from '../modules/Card'
import { card } from './card'

let template = `
<div class="pile">
    <div v-if="value > 0">
        <card :card="card"/>
    </div>
    <div v-if="value === 0" v-html="familySymbole" :class="familyColorClass" />

</div>
`

export const pile = {
    props : ['value', 'family'],
    template : template,
    data: function(){
        return {
            card: new Card(this.value, this.family)
        }
    },
    computed : {
        familySymbole : function(){ return getFamilySymbole(this.family) },
        familyColorClass : function(){ return 'pile-empty-' + this.card.colorTextLowerCase },
        imgPath: function(){
            return '../../images/cartes/' + this.card.getPath() + '.jpeg' 
        }
    },
    components : {
        card
    },
    methods: {
    }
};
