import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PlanService } from '../../app/services/plan.service';

@Component({
  selector: 'page-preset',
  templateUrl: 'preset.component.html'
})
export class PresetPage {

  constructor(public navCtrl: NavController, private planService: PlanService) {
    this.planService.createPlan({name: 'Default Plan', sets: 5, restTime: 90, actionTime: 30, actions: 2})
    this.planService.createPlan()
    console.log(this.planService.plans)
  }

}
