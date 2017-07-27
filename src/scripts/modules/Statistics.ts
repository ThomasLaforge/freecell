import { HistoricLineInterface, FieldJson, MAX_SAVE_SLOTS } from './Freecell'
import { Field } from './Field'

export class HistoricLine implements HistoricLineInterface {
    public start: number
    public end: number
    public tirage: Field

    constructor(tirage: FieldJson, start: number, end?: number){
        let field = new Field()
        field.importFromJson(tirage)
        this.tirage = field; 
        this.start = start
        this.end = end
    }

    timeSpend(){
        let end = this.end || Date.now()
        return end - this.start
    }

    won(){
        return !!this.end
    }
    lost(){
        return !this.end
    }

    finish(){
        this.end = Date.now()
    }

}

export class Statistics {

    public historic: HistoricLine[]
    public gamePrefix: string
    public nextKey: number

    constructor(gamePrefix = 'vue-freecell-game-'){
        this.gamePrefix = gamePrefix
        this.updateHistoric()
        console.log('initial historic', this.historic)
        console.log('win', this.getNbWonGame(), this.getWinRatio())
        console.log('lost', this.getNbLostGame(), this.getLoseRatio())
    }

    updateHistoric(){
        this.historic = [];
        let i = 0;
        let nextSaveSlot = localStorage.getItem(this.gamePrefix + i)
        while( nextSaveSlot && i < MAX_SAVE_SLOTS) {
            let slotObj: HistoricLineInterface = JSON.parse(nextSaveSlot)
            this.historic.push( new HistoricLine(slotObj.tirage, slotObj.start, slotObj.end) )
            i++
            nextSaveSlot = localStorage.getItem(this.gamePrefix + i)
        }
        this.nextKey = i
    }

    addGame(initialField: Field){
        localStorage.setItem(this.gamePrefix + this.nextKey, JSON.stringify( new HistoricLine( initialField, Date.now() ) ))
        this.nextKey++
    }

    getNbWonGame(){
        return this.historic.filter( g => { return g.end }).length
    }
    getNbLostGame(){
        return this.historic.filter( g => { return !g.end }).length
    }
    getNbGame(){
        return this.historic.length
    }
    getWinRatio(){
        return this.getNbWonGame() / this.getNbGame()
    }
    getLoseRatio(){
        return this.getNbLostGame() / this.getNbGame()
    }

    reset(){
        let i = 0;
        while( localStorage.getItem(this.gamePrefix + i) && i < MAX_SAVE_SLOTS) {
            localStorage.removeItem(this.gamePrefix + i)
            i++
        }
    }
    
}