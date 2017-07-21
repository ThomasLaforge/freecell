import { CardColor, CardFamily, getFamilyChar } from './Freecell'

export class Card {

	private _family: CardFamily;
	private _value: number;

	constructor(value: number, family: CardFamily) {
        this._family = family;
        this._value = value;
	}

	color(){
    	return (this.family === CardFamily.Heart || this.family === CardFamily.Diamond) ? CardColor.Red : CardColor.Black
	}

	getPath(){
        return getFamilyChar(this.family) + this.value
    }
    
// Getters / Setters
	public get family(): CardFamily {
		return this._family;
	}
	public set family(family: CardFamily) {
		this._family = family;
	}
	public get value(): number {
		return this._value;
	}
	public set value(value: number) {
		this._value = value;
	}

}