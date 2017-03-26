import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { IHiitPlan } from '../entities/hiit-plan.interface';

@Component({
  selector: 'app-input-group',
  templateUrl: 'input-group.component.html'
})
export class InputGroupComponent implements OnInit {
  @Input() started?: boolean;
  @Input() presetMode: boolean;
  currentPlan: IHiitPlan;
  updateMode: boolean;

  constructor(private planService: PlanService) {
  }

  ngOnInit() {
    this.currentPlan = this.presetMode ? this.planService.tempPlan : this.planService.currentPlan;
  }

  savePlan(): void {
    this.planService.createPlan(this.currentPlan);
  }
}
