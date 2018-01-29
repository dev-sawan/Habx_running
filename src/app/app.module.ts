import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { PostPage } from '../pages/post/post';
import { RegisterPage} from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { QuizPage } from '../pages/quiz/quiz';
import { CategoriesviewPage } from '../pages/categoriesview/categoriesview';
import{ ViewallpostPage} from '../pages/viewallpost/viewallpost';
import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';
//import { PdfViewerModule} from 'ng2-pdf-viewer'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
// import { ApiProvider } from '../providers/api/api';
// import { DocumentViewer}  from '@ionic-native/document-viewer'
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    PostPage,
    LoginPage,
    QuizPage,
    RegisterPage,
    ViewallpostPage,
    ContactPage,
    CategoriesviewPage,
    // DocumentViewer,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PostPage,
    LoginPage,
    QuizPage,
    ViewallpostPage,
    RegisterPage,
    ContactPage,
    CategoriesviewPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    WordpressService,
    AuthenticationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
