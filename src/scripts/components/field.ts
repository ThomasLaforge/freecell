import { column } from './column'

// <column :cards="columns[0].cards"/>

let template = `
<div class="field">
    <column v-for="(col, i) in columns" :key="i" :column="col"/>
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
