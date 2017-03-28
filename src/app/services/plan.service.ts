import { Injectable } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';
import { IHiitPlan } from '../entities/hiit-plan.interface';

@Injectable()
export class PlanService {
  plans: HiitPlan[] = [];
  currentPlan: HiitPlan;

  constructor() {
    this.createPlanAndSave({name: 'Default Plan1', sets: 5, restTime: 90, actionTime: 30, actions: 2});
    this.createPlanAndSave({name: 'Default Plan2', sets: 8, restTime: 90, actionTime: 30, actions: 2});
  }

  createPlanAndSave(presetPlan?: IHiitPlan): HiitPlan {
    const plan = new HiitPlan(presetPlan);
    this.plans.unshift(plan);
    return plan;
  }

  savePlan(): HiitPlan {
    this.currentPlan.updatedOn = new Date();
    this.plans.unshift(this.currentPlan);
    return this.currentPlan;
  }

  createCurrentPlan(): HiitPlan {
    this.currentPlan = new HiitPlan();
    return this.currentPlan;
  }

}
