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
    plan.updatedOn = new Date();
    this.plans.unshift(plan);
    return plan;
  }

  // add a new plan or update an existed plan
  savePlan(): HiitPlan {
    this.currentPlan.updatedOn = new Date();
    // if this plan a new plan or existed
    const existPlan = this.plans.find((plan) => {
      return plan.id === this.currentPlan.id;
    });
    // new plan add to array
    if(!existPlan) {
      this.plans.unshift(this.currentPlan);
    }
    return this.currentPlan;
  }

  createCurrentPlan(): HiitPlan {
    this.currentPlan = new HiitPlan();
    return this.currentPlan;
  }

  findPlanIndex(id: string): number {
    return this.plans.findIndex((plan) => {
      return plan.id === id;
    });
  }

}
