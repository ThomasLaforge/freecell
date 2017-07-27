export class Timer {

    private _startTime:number;

    constructor(autoStart: boolean = false){
		this.startTime = null
		if(autoStart){
			this.start();
		}
    }

	start(){
		this.startTime = Date.now();
	}
	restart(){
		this.start();
	}

	getTimeSinceStart() : number { //Time in miliseconds
		return this.startTime ? Date.now() - this.startTime : null;
	}

    /**
     * Getters / Setters
     */

	public get startTime(): number {
		return this._startTime;
	}
	public set startTime(value: number) {
		this._startTime = value;
	}
    

}