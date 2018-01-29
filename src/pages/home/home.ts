import { Component } from '@angular/core';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';
import { TabsPage} from '../tabs/tabs';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CategoriesviewPage } from '../categoriesview/categoriesview';
import {AboutPage} from '../about/about';
import {QuizPage} from '../quiz/quiz';
import { ViewallpostPage } from '../viewallpost/viewallpost';
//import { Api } from '../../providers/api/api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //providers: [Api]

})
export class HomePage {
  datas:any;

	posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;

  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    // private api :Api,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) {
      // api.index(1).subscribe ( data => {
      //   this.datas = data.json();
      // });
  }

  ionViewWillEnter() {
    this.authenticationService.getUser()
    .then(
      data => this.loggedUser = true,
      error => this.loggedUser = false
    );
    this.morePagesAvailable = true;

    //if we are browsing a category
    this.categoryId = this.navParams.get('id');
    this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPosts(this.categoryId)
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTapped(event, post) {
		this.navCtrl.push(PostPage, {
		  item: post
		});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;
    
    

    this.wordpressService.getRecentPosts(this.categoryId, page)
    .subscribe(data => {
      for(let post of data){
        if(!loading){
          infiniteScroll.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

  logOut(){
    this.authenticationService.logOut()
    .then(
      res => this.navCtrl.push(LoginPage),
      err => console.log('Error in log out')
    )
  }
  goToCategories(){
    this.navCtrl.push(CategoriesviewPage);
  }

  goToAboutus(){
    this.navCtrl.push(AboutPage);
  }

  goToQuiz(){
    this.navCtrl.push(QuizPage);

  }

  gotoviewpost(){
    this.navCtrl.push(ViewallpostPage);
  }


  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  
  
  onCancel (ev){
if(!ev.target.value){
this.wordpressService.getRecentPosts(1).subscribe(data =>{
this.datas = data.json();  
  })

  }

} 
}
