let template = `
<div class="timer">
        Timer : <span v-if="actualTime">{{ hours }} : {{ minutes }} : {{ seconds }}</span>
</div>
`

export const timer = {
    props : ['timer'],
    template : template,
    data: function(){
        return { 
            actualTime : 0
        }
    },
    created : function() {
        this.interval = setInterval( () => {
            this.actualTime = this.timer.getTimeSinceStart();
        }, 1000)
    },
    computed : {
        seconds(){
            let sec = Math.trunc(this.actualTime / 1000) % 60 
            return sec < 10 ? '0' + sec : sec
        },
        minutes() {
            let min = Math.trunc(this.actualTime / 1000 / 60) % 60;
            return min < 10 ? '0' + min : min
        },
        hours() {
            let h = Math.trunc(this.actualTime / 1000 / 60 / 60) % 24;
            return h < 10 ? '0' + h : h
        },
    },
    components : {
    },
    methods: {
    }
};