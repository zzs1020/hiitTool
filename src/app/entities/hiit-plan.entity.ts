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
    this.name = 'Not Set';
    this.id = '' + Math.floor(Math.random() * 100000);
    this.updatedOn = new Date();

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

  showName(): string {
    if (this.hasFieldFilled() && this.name === 'Not Set') {
      this.name = 'Unnamed Plan';
    }
    return this.name;
  }
}
