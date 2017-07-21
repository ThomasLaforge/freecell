export class Timer {

    private _startTime:number;

    constructor(autoStart: boolean = true){
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
		return Date.now() - this.startTime;
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