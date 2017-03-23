import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  minute: number;
  second: number;
  msec: number;
  started: boolean;
  simpleInterval: any;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.minute = 0;
    this.second = 0;
    this.msec = 0;
    this.started = false;
    // setInterval(() => {
    //   this.time = new Date().toISOString();
    // }, 1000);
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
}
