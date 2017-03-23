import { Component, OnInit, DoCheck } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HiitPlan } from '../../app/entities/hiit-plan.entity';
import { IHiitPlan } from '../../app/entities/hiit-plan.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, DoCheck {
  minute: number;
  second: number;
  msec: number;
  started: boolean;
  simpleInterval: any;
  presetPlan: IHiitPlan;
  hiitPlan: HiitPlan;
  planName: string;
  consumedSecondsInOneSet: number; // used to compare seconds in plan
  totalSeconds: number; // used to know when to end
  plannedTotalSeconds: number;
  plannedSecondsInOneSet: number;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.minute = 0;
    this.second = 0;
    this.consumedSecondsInOneSet = 0;
    this.totalSeconds = 0;
    this.msec = 0;
    this.started = false;
    this.hiitPlan = new HiitPlan();
    this.presetPlan = {name: 'Default Plan', sets: 5, restTime: 90, actionTime: 30, actions: 2};
  }

  ngDoCheck(): void {
    this.planName = this.hiitPlan.showName();
  }

  toggleTimer(): void {
    this.started = !this.started;
    if (this.started) {
      // calculate some basic info
      this.plannedSecondsInOneSet = this.hiitPlan.actionTime * this.hiitPlan.actions;
      this.plannedTotalSeconds = (this.plannedSecondsInOneSet + this.hiitPlan.restTime) * this.hiitPlan.sets - this.hiitPlan.restTime;
      // start a timer
      this.timing();
    } else {
      // pause a timer
      clearInterval(this.simpleInterval);
    }
  }

  resetTimer(): void {
    // clear interval
    clearInterval(this.simpleInterval);
    this.minute = 0;
    this.second = 0;
    this.msec = 0;
    this.started = false;
  }

  ender(): void {
    if (this.totalSeconds >= this.plannedTotalSeconds) {
      clearInterval(this.simpleInterval);
    }
  }

  timing(): void {
    this.simpleInterval = setInterval(() => {
      if (this.msec < 99) {
        this.msec++;
      } else {
        this.msec = 0;
        this.consumedSecondsInOneSet++;
        this.totalSeconds++;
        if (this.second < 59) {
          this.second++;
        } else {
          this.second = 0;
          this.minute++;
        }
      }
      this.reminder(); // should remind user to rest/exercise
      this.ender(); // all sets done, then end
    }, 10);
  }

  // TODO: use observable to do this
  reminder() {
    if (this.consumedSecondsInOneSet >= this.plannedSecondsInOneSet || this.consumedSecondsInOneSet >= this.hiitPlan.restTime) {
      this.consumedSecondsInOneSet = 0;
      // todo ring or change color
      console.log('next')
    }
  }

  // TODO: when go to other tabs, ask user to save changes if current plan changed
  loadPlan(hiitPlan: IHiitPlan) {
    this.hiitPlan.setPlan(hiitPlan);
  }
}
