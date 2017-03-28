import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PlanService } from '../../app/services/plan.service';
import { HiitPlan } from '../../app/entities/hiit-plan.entity';

@Component({
  selector: 'page-preset',
  templateUrl: 'preset.component.html'
})
export class PresetPage implements OnInit {
  editMode: boolean;
  searchString: string;
  plans: HiitPlan[];
  rotateDegree: number;
  rotateFunc: string;

  constructor(public navCtrl: NavController, private planService: PlanService) {
  }

  ngOnInit(): void {
    this.editMode = false;
    this.searchString = '';
    this.plans = this.planService.plans;
    this.rotateDegree = 0;
  }

  togglePlanEditor() {
    this.editMode = !this.editMode;
    this.rotateDegree += 135;
    this.rotateFunc = 'rotate(' + this.rotateDegree + 'deg)';
    if (this.editMode) {
      // just give a empty object
      this.planService.createCurrentPlan();
    }
  }

  onSearchInput(event): void {

  }

  onSearchCancel(event): void {

  }

  removeAllPlans(): void {
    this.plans = [];
  }
}
