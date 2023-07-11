import { EventEmitter } from "events";

export default class Time extends EventEmitter{
    constructor(){
        super();
      this.start = Date.now();
      this.curret = this.start;
      this.elapsed = 0;
      this.delta = 16;

      this.update();
    }   

    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.curret;
        this.curret = currentTime;
        this.elapsed = this.curret - this.start;
        
        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}