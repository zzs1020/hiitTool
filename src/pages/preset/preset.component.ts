import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PlanService } from '../../app/services/plan.service';
import { IHiitPlan } from '../../app/entities/hiit-plan.interface';

@Component({
  selector: 'page-preset',
  templateUrl: 'preset.component.html'
})
export class PresetPage implements OnInit {
  editMode: boolean;
  searchString: string;

  constructor(public navCtrl: NavController, private planService: PlanService) {
    this.planService.createPlan({name: 'Default Plan', sets: 5, restTime: 90, actionTime: 30, actions: 2})
    this.planService.createPlan()
    console.log(this.planService.plans)
  }

  ngOnInit(): void {
    this.editMode = false;
    this.searchString = '';
  }

  togglePlanEditor() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // just give a empty object
      this.planService.tempPlan = {} as IHiitPlan;
    }
  }

  onSearchInput(event): void {

  }

  onSearchCancel(event): void {

  }
}
