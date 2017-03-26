import { Component, OnInit, Input } from '@angular/core';
import { PlanService } from '../services/plan.service';
import { IHiitPlan } from '../entities/hiit-plan.interface';

@Component({
  selector: 'app-input-group',
  templateUrl: 'input-group.component.html'
})
export class InputGroupComponent implements OnInit {
  @Input() started;
  currentPlan: IHiitPlan;

  constructor(private planService: PlanService) {
  }

  ngOnInit() {
    this.currentPlan = this.planService.currentPlan;
  }

}
