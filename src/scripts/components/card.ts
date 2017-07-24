let template = `
<div class="card" :draggable="isDraggable" @dragstart="sendCardDragged" @dblclick="doubleClick">
    <img :draggable="isDraggable" :src="imgPath" v-if="card.value < 11" />
    <div v-if="card.value > 10">{{ card.family }} : {{card.value}}</div>
</div>
`

export const card = {
    props : ["card", "isDraggable"],
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
        sendCardDragged: function(){
            this.$emit('cardDragged')
        },
        doubleClick: function(){
            console.log('double click on card')
        }
    }
};
