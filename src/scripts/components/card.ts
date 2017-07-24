let template = `
<div class="card" :draggable="isDraggable" @dragstart="sendCardDragged" @dblclick="doubleClick">
    <img :draggable="isDraggable" :src="imgPath" widht="80px" height="160px"/>
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
            return '../../images/cartes/' + this.card.getPath() + '.png' 
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
