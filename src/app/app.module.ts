import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AddPage } from '../pages/add/add';

import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated/';

import { Camera } from '@ionic-native/camera';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CurrentItemsPage } from '../pages/current-items/current-items';
import { PreviousItemsPage } from '../pages/previous-items/previous-items';
import { TabsPage } from '../pages/tabs/tabs';
import { CurrentPage } from '../pages/current/current';
import { PreviousPage } from '../pages/previous/previous';
import { CurrentPageModule } from '../pages/current/current.module';
import { PreviousPageModule } from '../pages/previous/previous.module';
import { TabsService } from '../pages/tabs/tabs.service';

var config = {
  apiKey: "AIzaSyDnXttMV4eWyePFLtZpPsmIZ4YI_ueyx-o",
  authDomain: "practice-ae3c6.firebaseapp.com",
  databaseURL: "https://practice-ae3c6.firebaseio.com",
  projectId: "practice-ae3c6",
  storageBucket: "practice-ae3c6.appspot.com",
  messagingSenderId: "292749602225"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    CurrentPageModule,
    PreviousPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    AddPage,
    TabsPage,
    CurrentPage,
    PreviousPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    LocalNotifications,
    TabsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
