import { Injectable } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';
import { IHiitPlan } from '../entities/hiit-plan.interface';
import { Storage } from '@ionic/storage';

@Injectable()
export class PlanService {
  plans: HiitPlan[] = [];
  currentPlan: HiitPlan;

  constructor(private storage: Storage) {
    storage.ready().then(() => {

      // todo: there's no easy way to know if both 2 following finished before get all plans because it's promise, should introduce observable
      // this.createPlanAndSave({id: 'defaultId1', name: 'Default Plan1', sets: 5, restTime: 90, actionTime: 30, actions: 2});
      // this.createPlanAndSave({id: 'defaultId2', name: 'Default Plan2', sets: 8, restTime: 90, actionTime: 30, actions: 2});

      // get all plans
      this.plans = [];
      storage.forEach((plan) => {
        this.plans.push(plan);
      });
    });

  }

  // just used for making my default plans
  private createPlanAndSave(presetPlan?: IHiitPlan): Promise<HiitPlan> {
    const plan = new HiitPlan(presetPlan);
    plan.updatedOn = new Date();
    return this.save(plan);
  }

  // add/update to local this.plans
  saveToLocal(plan: HiitPlan): void {
    // if this plan a new plan or existed
    const existPlanIndex = this.plans.findIndex((existedPlan) => {
      return existedPlan.id === plan.id;
    });
    // new plan add to array
    if(existPlanIndex === -1) {
      this.plans.unshift(plan);
    } else {
      // replace this plan
      this.plans.splice(existPlanIndex, 1, plan);
    }
  }

  // save to db and then add to service.plans
  save(plan?: HiitPlan): Promise<any> {
    plan = plan || this.currentPlan;
    plan.updatedOn = new Date();
    plan.name = plan.name || 'Unnamed Plan';
    return this.storage.set(plan.id, plan).then((savedPlan) => {
      this.saveToLocal(savedPlan);
    });
  }

  createCurrentPlan(): HiitPlan {
    this.currentPlan = new HiitPlan();
    return this.currentPlan;
  }

  copyToCurrentPlan(plan: HiitPlan): HiitPlan {
    this.currentPlan.setWholePlan(plan);
    return this.currentPlan;
  }

  findPlanIndex(id: string): number {
    return this.plans.findIndex((plan) => {
      return plan.id === id;
    });
  }

}
