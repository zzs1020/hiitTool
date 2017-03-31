import { Component } from '@angular/core';

import { HomePage } from '../home/home.component';
import { AboutPage } from '../about/about.component';
import { PresetPage } from '../preset/preset.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = PresetPage;

  constructor() {

  }
}
