import { Injectable } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';
import { IHiitPlan } from '../entities/hiit-plan.interface';

@Injectable()
export class PlanService {
  plans: HiitPlan[] = [];
  currentPlan: HiitPlan;
  tempPlan: IHiitPlan;

  constructor() {}

  createPlan(presetPlan?: IHiitPlan): HiitPlan {
    const plan = new HiitPlan(presetPlan);
    this.plans.unshift(plan);
    return plan;
  }

  createCurrentPlan(): HiitPlan {
    this.currentPlan = new HiitPlan();
    return this.currentPlan;
  }


}
