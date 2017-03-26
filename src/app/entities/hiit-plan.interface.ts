export interface IHiitPlan {
  sets: number;
  restTime: number;
  actionTime: number;
  actions: number;
  readonly id?: string;
  name?: string;
  description?: string;
  updatedOn?: Date;
}
