import { card } from './card'

let template = `
<div class="column">
    <card v-for="(card, i) in cards" 
        :key="i" 
        :card="card"
    />
</div>
`

export const column = {
    props : ['cards'],
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
    }
};
