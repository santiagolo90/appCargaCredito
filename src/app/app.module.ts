import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import {LoginPage} from '../pages/login/login';//agregue esto
import {CreditoPage} from '../pages/credito/credito';//agregue esto
import { RegistroPage } from'../pages/registro/registro';//agregue esto

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

//LectorQR
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export const firebaseConfig = {
  //Datos FireBase
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,//agregue esto
    CreditoPage,
    AboutPage,
    ContactPage,
    HomePage,
    RegistroPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,//agregue esto
    CreditoPage,//agregue esto
    AboutPage,
    ContactPage,
    HomePage,
    RegistroPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
