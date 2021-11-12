import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timer: number
  interval: any
  time: any

  constructor() { }

  startTimer(duration: number, start:number){
    this.timer = start
    this.interval = setInterval(() => {
      this.updateTimeValue(duration)
    }, 1000)
  }

  updateTimeValue(duration:number){
    let minutes:any = this.timer / 60
    let seconds:any = this.timer % 60

    minutes = String('0' + Math.floor(minutes)).slice(-2)
    seconds = String('0' + Math.floor(seconds)).slice(-2)
    
    const text = minutes + ":" + seconds
    this.time.next(text)

    ++this.timer

    if(this.timer > duration * 60){
      this.startTimer(duration, 0)
    }
  }

}
