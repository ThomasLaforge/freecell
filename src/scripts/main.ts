// Libraries
    import * as _ from 'lodash'

// Model
    import { Game } from './modules/Game'
    import { Deck } from './modules/Deck'
    import { Piles } from './modules/Piles'
    import { Field } from './modules/Field'
    import { Timer } from './modules/Timer'
    import { FreeCells } from './modules/FreeCells'
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
            game: new Game()
        }
    },
    computed: {
    },
    components:{
        game
    },
    methods: {
        reset(){
            // this.game.reset();
            this.game.deck = new Deck();
            this.game.field = new Field();
            this.game.freeCells = new FreeCells();
            this.game.timer = new Timer();
            this.game.piles = new Piles();
            this.game.init()
            console.log('main:reset', this.game)
        }

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

