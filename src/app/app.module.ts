import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { PresetPage } from '../pages/preset/preset';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { SecondTrans } from './pipes/second-trans.pipe';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Brightness } from '@ionic-native/brightness';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    PresetPage,
    HomePage,
    TabsPage,
    SecondTrans
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    Toast
  ]
})
export class AppModule {}
