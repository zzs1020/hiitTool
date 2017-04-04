import { Injectable } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';
import { IHiitPlan } from '../entities/hiit-plan.interface';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/merge'; // this import instance method, while rxjs/add/observable/merge import static method
import 'rxjs/add/operator/finally';

@Injectable()
export class PlanService {
  plans: HiitPlan[] = [];
  currentPlan: HiitPlan;

  constructor(private storage: Storage) {
    storage.ready().then(() => {

      // 2 observable save together, and when all done show db
      this.createPlanAndSave({id: 'defaultId1', name: 'Default Plan1', sets: 5, restTime: 90, actionTime: 30, actions: 2})
        .merge(this.createPlanAndSave({id: 'defaultId2', name: 'Default Plan2', sets: 8, restTime: 90, actionTime: 30, actions: 2}))
        .finally(() => {
          // get all plans
          this.getAllFromDB();
        });
    });
  }

  // just used for making my default plans
  private createPlanAndSave(presetPlan?: IHiitPlan): Observable<HiitPlan> {
    const plan = new HiitPlan(presetPlan);
    plan.updatedOn = new Date();
    return Observable.fromPromise(this.save(plan));
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
  save(plan?: HiitPlan): Promise<HiitPlan> {
    plan = plan || this.currentPlan;
    plan.updatedOn = new Date();
    plan.name = plan.name || 'Unnamed Plan';

    // only save useful properties to storage
    return this.storage.set(plan.id, plan.getRawPlan()).then((savedRawPlan) => {
      // but in memory we still need plan's method
      this.saveToLocal(new HiitPlan(savedRawPlan));
    });
  }

  remove(id: string): Promise<HiitPlan> {
    return this.storage.remove(id).then(() => {
      this.plans.splice(this.findPlanIndex(id), 1);
      // if already load this plan
      if (this.currentPlan.id === id) {
        this.createCurrentPlan();
      }
    });
  }

  removeAll(): Promise<HiitPlan> {
    return this.storage.clear().then(() => {
      this.plans = [];
      this.createCurrentPlan();
    });
  }

  getAllFromDB(): void {
    // get all plans
    this.plans = [];
    this.storage.forEach((plan) => {
      // recover to HiitPlan Object, because it's function can't be recovered if also stored functions
      this.plans.push(new HiitPlan(plan));
    });
  }

  // create a empty plan to give current plan or assign a plan to current plan
  createCurrentPlan(plan?: HiitPlan): HiitPlan {
    this.currentPlan = new HiitPlan();
    if (plan) {
      this.currentPlan.setRawPlan(plan);
    }
    return this.currentPlan;
  }

  findPlanIndex(id: string): number {
    return this.plans.findIndex((plan) => {
      return plan.id === id;
    });
  }

}
