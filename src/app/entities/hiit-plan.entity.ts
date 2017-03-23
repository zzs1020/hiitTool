import { IHiitPlan } from './hiit-plan.interface';

export class HiitPlan implements IHiitPlan{
  name?: string;
  readonly id: string;
  sets: number;
  restTime: number;
  actionTime: number;
  actions: number;

  constructor(plan?: IHiitPlan) {
    if (plan) {
      this.name = plan.name || 'An Unnamed Plan';
      this.sets = plan.sets;
      this.restTime = plan.restTime;
      this.actions = plan.actions;
      this.actionTime = plan.actionTime;
    }
    this.id = '' + Math.floor(Math.random() * 100000);
  }

  setPlan(plan: IHiitPlan): void {
    this.name = plan.name || 'An Unnamed Plan';
    this.sets = plan.sets;
    this.restTime = plan.restTime;
    this.actions = plan.actions;
    this.actionTime = plan.actionTime;
  }

  clear(): void {
    this.sets = null;
    this.restTime = null;
    this.actionTime = null;
    this.actions = null;
  }

  hasSetProperty(): boolean {
    return Boolean(this.sets || this.restTime || this.actionTime || this.actions);
  }
}
