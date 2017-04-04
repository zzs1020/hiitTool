import { Pipe, PipeTransform } from '@angular/core';
import { HiitPlan } from '../entities/hiit-plan.entity';

@Pipe({
  name: 'appPlanFilter',
  pure: false
})
export class PlanFilterImpurePipe implements PipeTransform {
  transform(plans: HiitPlan[], planName: string): any {
    if (planName && planName.trim() !== '') {
      planName = planName.toLowerCase();
      return plans.filter((plan) => {
        return plan.name.toLowerCase().includes(planName);
      })
    } else {
      return plans;
    }
  }
}
