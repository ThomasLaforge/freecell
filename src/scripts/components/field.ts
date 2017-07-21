import { column } from './column'

let template = `
<div class="field">
    <column v-for="(col, i) in columns" :key="i" :cards="col.cards"/>
</div>
`

export const field = {
    props : ['columns'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
    },
    components : {
        column
    },
    methods: {
    }
};
