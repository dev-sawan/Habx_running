import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthenticationService } from '../services/authentication.service';
import { LoginPage } from '../pages/login/login';
import {AboutPage} from '../pages/about/about';
import { QuizPage } from '../pages/quiz/quiz';
import {CategoriesviewPage} from '../pages/categoriesview/categoriesview';
import {ViewallpostPage} from '../pages/viewallpost/viewallpost';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav:Nav;

 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authenticationService: AuthenticationService) {
    platform.ready().then(() => {
      authenticationService.getUser()
      .then(
        data => {
          authenticationService.validateAuthToken(data.token)
          .subscribe(
            res => this.rootPage = HomePage,
            err =>   this.rootPage = LoginPage
          )
        },
        err => this.rootPage = LoginPage
      );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  gotohome(){
    this.nav.setRoot(HomePage);
      }
      gotoaboutus(){
        this.nav.setRoot(AboutPage);
        
          }
          
}

