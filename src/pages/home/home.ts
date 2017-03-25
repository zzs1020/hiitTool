import { Component, OnInit, DoCheck } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { HiitPlan } from '../../app/entities/hiit-plan.entity';
import { IHiitPlan } from '../../app/entities/hiit-plan.interface';
import { NativeAudio } from '@ionic-native/native-audio';

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
  notifying: string;
  currentStatus: boolean; // true for in exercise, false for in rest

  constructor(public navCtrl: NavController, private plt: Platform, private nativeAudio: NativeAudio) {
    plt.ready().then(() => {
      nativeAudio.preloadSimple('actionEnd', 'assets/audio/isnt-it.m4r');
      nativeAudio.preloadSimple('restEnd', 'assets/audio/filling-your-inbox.m4r');
    });
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
      this.plannedTotalSeconds = (this.plannedSecondsInOneSet + +this.hiitPlan.restTime) * this.hiitPlan.sets - this.hiitPlan.restTime;
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
      this.resetTimer();
    }
  }

  timing(): void {
    this.simpleInterval = setInterval(() => {
      if (this.msec < 9) {
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
    }, 100);
  }

  // TODO: use observable to do this
  reminder(): void {
    if (this.consumedSecondsInOneSet > this.plannedSecondsInOneSet) {
      this.consumedSecondsInOneSet = 0;
      // todo ring or change color
      this.notifyUser();
    } else if (this.consumedSecondsInOneSet > this.hiitPlan.restTime) {

    }
  }

  notifyUser(): void {
    // random background
    this.notifying = '#ff' + Math.floor(Math.random()*10000);

    this.nativeAudio.play('actionEnd');
  }

  // TODO: when go to other tabs, ask user to save changes if current plan changed
  loadPlan(hiitPlan: IHiitPlan): void {
    this.hiitPlan.setPlan(hiitPlan);
  }
}
