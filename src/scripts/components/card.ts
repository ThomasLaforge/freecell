let template = `
<div class="card" draggable="true">
    <img :src="imgPath" v-if="card.value < 11" />
    <div v-if="card.value > 10">{{ card.family }} : {{card.value}}</div>
</div>
`

export const card = {
    props : ["card"],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
        imgPath: function(){
            return '../../images/cartes/' + this.card.getPath() + '.jpeg' 
        }
    },
    components : {
    },
    methods: {
    }
};
