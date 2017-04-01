import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-input-group',
  templateUrl: 'input-group.component.html'
})
export class InputGroupComponent {
  @Input() started?: boolean;
  @Input() presetMode?: boolean;
  @Output() savedStatus: EventEmitter<boolean>;

  constructor(public planService: PlanService, private platform: Platform, private keyboard: Keyboard) {
    this.savedStatus = new EventEmitter();
    platform.ready().then(() => {
      keyboard.disableScroll(true);
    });
  }

  savePlan(): void {
    this.planService.save();
    // true means nothing, just a flag to tell upper to close window
    this.savedStatus.emit(true);
  }
}
