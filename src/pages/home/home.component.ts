import { Component, OnInit, DoCheck } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Brightness } from '@ionic-native/brightness';
import { Toast } from '@ionic-native/toast';
import { PlanService } from '../../app/services/plan.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage implements OnInit, DoCheck {
  minute: number;
  second: number;
  msec: number;
  started: boolean;
  simpleInterval: any;
  consumedSecondsInOneAction: number; // used to compare seconds in plan
  completedActions: number;
  consumedSecondsInRest: number; // used to compare seconds in plan
  consumedTotalSeconds: number; // used to know when to end
  plannedTotalSeconds: number;
  notifying: string;
  currentStatus: boolean; // true for in exercise, false for in rest
  nextNotification: string;

  constructor(public navCtrl: NavController, private plt: Platform, private brightness: Brightness,
              private nativeAudio: NativeAudio, private backgroundMode: BackgroundMode, private toast: Toast,
              public planService: PlanService
  ) {
    // todo: change audio name for change to my own audio
    // todo: only enable backgroud and bright when start exsercise
    plt.ready().then(() => {
      nativeAudio.preloadComplex('actionStart', 'assets/audio/isnt-it.m4r', 1, 1, 0).then(()=>console.log('action audio done'), (err)=>console.log('action audio err:'+err));
      nativeAudio.preloadComplex('restStart', 'assets/audio/filling-your-inbox.m4r', 1, 1, 0).then(()=>console.log('rest audio done'), (err)=>console.log('rest audio err:'+err));
      backgroundMode.enable();
      brightness.setKeepScreenOn(true);
    });
  }

  ngOnInit(): void {
    this.minute = 0;
    this.second = 0;
    this.msec = 0;
    this.started = false;
    this.consumedSecondsInOneAction = 0;
    this.completedActions = 0;
    this.consumedTotalSeconds = 0;
    this.consumedSecondsInRest = 0;
    this.completedActions = 0;
    this.plannedTotalSeconds = 0;
    this.currentStatus = true;

    this.planService.createCurrentPlan();

  }

  ngDoCheck(): void {
    this.plannedTotalSeconds = this.planService.currentPlan.totalTime();
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
    this.consumedSecondsInOneAction = 0;
    this.completedActions = 0;
    this.consumedTotalSeconds = 0;
    this.consumedSecondsInRest = 0;
    this.completedActions = 0;
    this.notifying = '#ffffff';
    this.nextNotification = '';
    this.currentStatus = true;
  }

  ender(): void {
    if (this.consumedTotalSeconds === this.plannedTotalSeconds) {
      this.resetTimer();
    }
  }

  timing(): void {
    this.simpleInterval = setInterval(() => {
      if (this.msec < 9) {
        this.msec++;
      } else {
        this.msec = 0;
        this.consumedTotalSeconds++;
        if (this.currentStatus) {
          // exercise state
          this.consumedSecondsInOneAction++;
        } else {
          this.consumedSecondsInRest++;
        }
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
    // compare exercise time
    if (this.consumedSecondsInOneAction === +this.planService.currentPlan.actionTime) { // input is string
      this.consumedSecondsInOneAction = 0;
      this.completedActions++;
      if (this.completedActions === +this.planService.currentPlan.actions) {
        this.currentStatus = false;
        this.completedActions = 0;
      }
      this.notifyUser();
    }
    // compare rest time
    if (this.consumedSecondsInRest === +this.planService.currentPlan.restTime) {
      this.consumedSecondsInRest = 0;
      this.currentStatus = true;
      this.notifyUser();
    }
  }

  notifyUser(): void {
    // play different audio
    if (this.currentStatus) {
      this.notifying = '#ffad36';
      this.nextNotification = 'Start Action ' + (this.completedActions + 1);
      // this.toast.show("I'm a toast", '5000', 'bottom');
      this.nativeAudio.play('actionStart').then(()=>console.log('action audio played'), (err)=>console.log('action audio not played:'+err));
    } else {
      this.notifying = '#3fe7ff';
      this.nextNotification = 'Take a ' + this.planService.currentPlan.restTime + 's Break';
      this.nativeAudio.play('restStart').then(()=>console.log('rest audio played'), (err)=>console.log('rest audio not played:'+err));
    }
  }

  unloadPlan(): void {
    this.resetTimer();
    this.planService.createCurrentPlan(); // create a plan with empty fields
  }
}
