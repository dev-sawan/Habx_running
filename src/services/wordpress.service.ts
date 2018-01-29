import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Config from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { RequestOptions } from '@angular/http/src/base_request_options';


@Injectable()
export class WordpressService {
  constructor(public http: Http){}



  getRecentPosts(categoryId:number, page:number = 1){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Bearer ' + user.token);

    // let options = new RequestOptions({ headers: headers });
    
    // let options = new RequestOptions({hea})
    
    return this.http.get( Config.WORDPRESS_REST_API_URL+ 'posts?page=' + page + category_url)
    .map(res => res.json());
  }

  // getRecentPosts(categoryId:number, page:number = 1,user:any){
  //   //if we want to query posts by category
  //   let header:Headers = new Headers();
  //   header.append('Authorization', 'Bearer' + user.token);

  //   let category_url = categoryId? ("&categories=" + categoryId): "";
    
  //   return this.http.get( Config.WORDPRESS_REST_API_URL+ 'posts?page=' + page + category_url + user.token,{ headers: header } )
  //   .map(res => res.json());
  // }


  getComments(postId:number, page:number = 1){
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + "comments?post=" + postId
      + '&page=' + page)
    .map(res => res.json());
  }

  getAuthor(author){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "users/" + author)
    .map(res => res.json());
  }

  getPostCategories(post){
    let observableBatch = [];

    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });

    return Observable.forkJoin(observableBatch);
  }

  getCategory(category){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/" + category)
    .map(res => res.json());
  }

  createComment(postId, user, comment){
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer' + user.token);

    return this.http.post(Config.WORDPRESS_REST_API_URL + "comments?token=" + user.token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: header })
    .map(res => res.json());
  }

  

}
