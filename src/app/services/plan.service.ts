import { Injectable } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';
import { IHiitPlan } from '../entities/hiit-plan.interface';

@Injectable()
export class PlanService {
  plans: HiitPlan[] = [];
  currentPlan: HiitPlan;
  tempPlan: IHiitPlan;

  constructor() {
    this.createPlan({name: 'Default Plan1', sets: 5, restTime: 90, actionTime: 30, actions: 2});
    this.createPlan({name: 'Default Plan2', sets: 8, restTime: 90, actionTime: 30, actions: 2});
  }

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
