export class Timer {
    timer!: NodeJS.Timer;
    timeout: number;
    callback: any;
  
    constructor(callback: any, timeout: number) {
      this.callback = callback;
      this.timeout = timeout;
    }
  
    start() {
      this.timer = setInterval(() => {
        this.callback();
        this.clear();
      }, this.timeout)
    }
  
    clear() {
      clearInterval(this.timer);
    }
}