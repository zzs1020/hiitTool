import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about.component';
import { PresetPage } from '../pages/preset/preset.component';
import { HomePage } from '../pages/home/home.component';
import { TabsPage } from '../pages/tabs/tabs.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { Keyboard } from '@ionic-native/keyboard';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Brightness } from '@ionic-native/brightness';

import { PlanService } from './services/plan.service';
import { InputGroupComponent } from './shared-cmps/input-group/input-group.component';
import { DatePipe } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { PlanFilterImpurePipe } from './pipes/plan-filter.pipe';
import { SecondTransPipe } from './pipes/second-trans.pipe';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    PresetPage,
    HomePage,
    TabsPage,
    SecondTransPipe,
    PlanFilterImpurePipe,
    InputGroupComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PresetPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio,
    BackgroundMode,
    Brightness,
    PlanService,
    DatePipe,
    Keyboard,
    ScreenOrientation
  ]
})
export class AppModule {}
