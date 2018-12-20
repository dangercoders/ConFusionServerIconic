import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { MenuPage } from '../pages/menu/menu';
import { ReservationPage } from '../pages/reservation/reservation';
import { FavoritePage } from '../pages/favorite/favorite';
import { ContactPage } from '../pages/contact/contact';
import { DishdetailPage } from '../pages/dishdetail/dishdetail';
import { CommentPage } from '../pages/comment/comment';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';

import { baseURL } from '../shared/baseurl';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { CallNumber } from '@ionic-native/call-number';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyB0yqVqyXjJyiWOthjREJc5kxdo8-GAe9E",
    authDomain: "examstep.firebaseapp.com",
    databaseURL: "https://examstep.firebaseio.com",
    projectId: "examstep",
    storageBucket: "examstep.appspot.com",
    messagingSenderId: "549760170393"
};


@NgModule({
  declarations: [
    AboutPage,
    MenuPage,
    ContactPage,
    MyApp,
    HomePage,
	DishdetailPage,
	FavoritePage,
	ReservationPage,
	CommentPage,
	LoginPage,
	RegisterPage
    //ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	HttpModule,
	IonicStorageModule.forRoot(),
	AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AboutPage,
    MenuPage,
    ContactPage,
    MyApp,
    HomePage,
	DishdetailPage,
	FavoritePage,
	ReservationPage,
	CommentPage,
	LoginPage,
	RegisterPage
   // ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
	{ provide: 'BaseURL', useValue: baseURL },
    FavoriteProvider,
	LocalNotifications,
	EmailComposer,
	SocialSharing,
	Camera,
	Network,
	CallNumber,
	AngularFireDatabase
  ]
})
export class AppModule {}
