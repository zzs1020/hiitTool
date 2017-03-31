import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController, List, NavController } from 'ionic-angular';
import { PlanService } from '../../app/services/plan.service';
import { HiitPlan } from '../../app/entities/hiit-plan.entity';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-preset',
  templateUrl: 'preset.component.html'
})
export class PresetPage implements OnInit {
  editMode: boolean;
  searchString: string;
  rotateDegree: number;
  rotateFunc: string;
  @ViewChild(List) list: List;

  constructor(public navCtrl: NavController, public planService: PlanService,
              private alertCtrl: AlertController, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.editMode = false;
    this.searchString = '';
    this.rotateDegree = 0;
  }

  togglePlanEditor(plan?: HiitPlan): void {
    if (plan) {
      // if already have a plan in place and try to change to anther plan
      this.planService.copyToCurrentPlan(plan);
      this.list.closeSlidingItems();
      if (!this.editMode) {
        this.editMode = true;
        this.rotateAnimation();
      }
    } else {
      this.editMode = !this.editMode;
      this.rotateAnimation();

      // if try to add a new plan, just give a empty object
      // if try to close 'input-group' empty current plan
      this.planService.createCurrentPlan();
    }
  }

  rotateAnimation(): void {
    this.rotateDegree += 135;
    this.rotateFunc = 'rotate(' + this.rotateDegree + 'deg)';
  }

  //todo: search plan
  onSearchInput(event): void {

  }

  onSearchCancel(event): void {

  }

  deletePlan(id: string) {
    this.planService.plans.splice(this.planService.findPlanIndex(id), 1);
  }

  removeAllPlans(): void {
    this.planService.plans = [];
  }

  showDetails(plan: HiitPlan) {
    let message = 'Sets: ' + plan.sets + ', Rest Time: ' + plan.restTime + 's<br>actions: ' + plan.actions +
                  ', Action Time ' + plan.actionTime + 's<br>Description: ' + (plan.description || '');

    this.alertCtrl.create({
      title: plan.name,
      subTitle: 'Last update: ' + this.datePipe.transform(plan.updatedOn, 'MM/dd/y, H:mm:ss'),
      message,
      buttons: [
        'Dismiss',
        {
          text: 'Load Plan',
          handler: () => this.loadPlan(plan)
        }
      ]
    }).present();

    this.list.closeSlidingItems();
  }

  // navigate to home and load plan
  loadPlan(plan) {
    this.navCtrl.parent.select(0);
    this.planService.currentPlan = plan;
  }
}
