// Libraries
    import * as _ from 'lodash'

// Model
    import { Game } from './modules/Game'
    let g = new Game();
    g.init();
    // let currentGame = g.gameStateManager.currentSlot
// Game Config

// Vue
    import { game } from './components/game';

// VueIt8n
    // import * as VueI18n from 'vue-i18n'
    // Vue.use(VueI18n)
    // Vue.config.lang = 'fr'
    // import {locales} from './locales'
    // Object.keys(locales).forEach(function (lang) {
    //     Vue.locale(lang, locales[lang])
    // })

// Main
let app = new Vue({
    el: '#app',
    data: () => {
        return {
            game: g
        }
    },
    computed: {
    },
    components:{
        game
    },
    methods: {
        // selectCard(card: PlayableCard, i: number, j: number) {
        //     this.dragdrop.card = card;
        //     this.dragdrop.i = i;
        //     this.dragdrop.j = j;
        // },
        // dragCard(x: number, y: number){
        //     this.hovercoords = this.player.map.getCellsUnderCard(this.dragdrop.card, this.dragdrop.i, this.dragdrop.j, y, x)
        // },
        // addCard(x: number, y: number){
        //     this.game.play(this.dragdrop.card, this.dragdrop.i, this.dragdrop.j, y, x)
        // }
    }
})

