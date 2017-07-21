import { pile } from './pile'
import { field } from './field'
import { freecell } from './freecell'

let template = `
<div class="game">
    <div class="game-top">
        <div class="piles">
            <pile v-for="(p, i) in game.piles.piles" :value="p.value" :family="i" :key="i" /> 
        </div>
        
        <div class="freecells">
            <freecell v-for="(f, i) in game.freeCells.freeCells" :freecell="f" :key="i" />
        </div>
    </div>

    <field :columns="game.field.columns"/>
</div>
`

export const game = {
    props : ['game'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {

    },
    components : {
        pile,
        freecell,
        field
    },
    methods: {
    }
};
