import { IHiitPlan } from './hiit-plan.interface';

export class HiitPlan implements IHiitPlan{
  name?: string;
  description?: string;
  readonly id: string;
  updatedOn: Date;
  sets: number;
  restTime: number;
  actionTime: number;
  actions: number;

  constructor(plan?: IHiitPlan) {
    this.id = '' + Math.floor(Math.random() * 100000);

    if (plan) {
      this.name = plan.name || 'Unnamed Plan';
      this.sets = plan.sets;
      this.restTime = plan.restTime;
      this.actions = plan.actions;
      this.actionTime = plan.actionTime;
      this.description = plan.description;
    }
  }

  setPlan(plan: IHiitPlan): void {
    this.name = plan.name || 'Unnamed Plan';
    this.sets = plan.sets;
    this.restTime = plan.restTime;
    this.actions = plan.actions;
    this.actionTime = plan.actionTime;
    this.description = plan.description;
  }

  clear(): void {
    this.name = 'Not Set';
    this.sets = null;
    this.restTime = null;
    this.actionTime = null;
    this.actions = null;
  }

  allFieldFilled(): boolean {
    return Boolean(this.sets && this.restTime && this.actionTime && this.actions);
  }

  hasFieldFilled(): boolean {
    return Boolean(this.sets || this.restTime || this.actionTime || this.actions);
  }

  // return in seconds
  totalTime(): number {
    if (this.allFieldFilled()) {
      return (this.actions * this.actionTime + +this.restTime) * this.sets - this.restTime;
    }
    return 0;
  }
}
