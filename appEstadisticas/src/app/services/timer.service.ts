import { Injectable } from '@angular/core';
import { clear } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timer: number = 0
  interval: any
  posHome: number = 0
  posAway: number = 0
  paused: boolean = true
  posesion: boolean = true
  time: BehaviorSubject<String> = new BehaviorSubject('00:00')

  constructor() { }

  startTimer(duration: number, start:number){
    if(this.paused){
      this.paused = false
      this.timer = start
      this.interval = setInterval(() => {
        this.updateTimeValue(duration)
      }, 1000)
    }
  }

  updateTimeValue(duration:number){
    let minutes:any = this.timer / 60
    let seconds:any = this.timer % 60

    minutes = String('0' + Math.floor(minutes)).slice(-2)
    seconds = String('0' + Math.floor(seconds)).slice(-2)
    
    const text = minutes + ":" + seconds
    this.time.next(text)

    this.timer++
    this.posesionF()

    if(this.timer > duration * 60){
      this.startTimer(duration, 0)
    }
  }

  stop(){
    this.paused = true
    clearInterval(this.interval)
  }

  cambiarPos(){
    this.posesion = !this.posesion
  }

  posesionF(){
    if(this.posesion){
      this.posHome++
    }else{
      this.posAway++
      console.log(this.posAway)
    }
  }

}
