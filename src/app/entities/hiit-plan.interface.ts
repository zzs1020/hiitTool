export interface IHiitPlan {
  sets: number;
  restTime: number;
  actionTime: number;
  actions: number;
  readonly id?: string;
  name?: string;
  description?: string;
  readonly createdOn?: Date;
  updatedOn?: Date;
}
