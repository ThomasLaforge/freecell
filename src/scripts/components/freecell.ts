import { card } from './card'

let template = `
<div class="freecell">
    <card v-if="card" :card="card" />
</div>
`

export const freecell = {
    props : ['card'],
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
