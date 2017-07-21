let template = `
<div class="pile">
    pile {{ family }} : {{ value }}
</div>
`

export const pile = {
    props : ['value', 'family'],
    template : template,
    data: function(){
        return {
        }
    },
    computed : {
    },
    components : {
    },
    methods: {
    }
};
