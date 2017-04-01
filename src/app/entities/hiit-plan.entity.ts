import { IHiitPlan } from './hiit-plan.interface';

export class HiitPlan implements IHiitPlan{
  name?: string;
  description?: string;
  id: string;
  updatedOn: Date;
  sets: number;
  restTime: number;
  actionTime: number;
  actions: number;

  constructor(plan?: IHiitPlan) {
    this.id = '' + Math.floor(Math.random() * 1000000000000000000);

    if (plan) {
      this.setRawPlan(plan);
    }
  }

  // no update time
  setRawPlan(plan: IHiitPlan): void {
    this.id = plan.id || this.id; // use it's own id or new random id
    this.name = plan.name || 'Unnamed Plan';
    this.updatedOn = plan.updatedOn;
    this.sets = plan.sets;
    this.restTime = plan.restTime;
    this.actions = plan.actions;
    this.actionTime = plan.actionTime;
    this.description = plan.description;
  }

  getRawPlan(): IHiitPlan {
    return {
      id: this.id,
      name: this.name,
      sets: this.sets,
      restTime: this.restTime,
      actions: this.actions,
      actionTime: this.actionTime,
      description: this.description,
      updatedOn: this.updatedOn
    };
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
