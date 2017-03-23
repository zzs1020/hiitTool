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

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.minute = 0;
    this.second = 0;
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

  timing(): void {
    this.simpleInterval = setInterval(() => {
      if (this.msec < 99) {
        this.msec++;
      } else {
        this.msec = 0;
        if (this.second < 59) {
          this.second++;
        } else {
          this.second = 0;
          this.minute++;
        }
      }
    }, 10);
  }

  //TODO: when go to other tabs, ask user to save changes if current plan changed
  loadPlan(hiitPlan: IHiitPlan) {
    this.hiitPlan.setPlan(hiitPlan);
  }
}
