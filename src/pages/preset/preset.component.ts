import { Component, OnInit, ViewChild } from '@angular/core';

import { List, NavController } from 'ionic-angular';
import { PlanService } from '../../app/services/plan.service';
import { HiitPlan } from '../../app/entities/hiit-plan.entity';

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

  constructor(public navCtrl: NavController, public planService: PlanService) {
  }

  ngOnInit(): void {
    this.editMode = false;
    this.searchString = '';
    this.rotateDegree = 0;
  }

  // todo: should close window when navigate out
  togglePlanEditor(plan?: HiitPlan) {
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

  //todo: show details
  showDetails() {

  }

  // navigate to home and load plan
  loadPlan(plan) {
    this.navCtrl.parent.select(0);
    this.planService.currentPlan = plan;
  }
}
