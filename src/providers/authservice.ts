import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Globals} from './globals';
import { Storage } from '@ionic/storage';

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
 currentUser: User;
 public data; 
  constructor(public http: Http, public globals:Globals, public storage: Storage) {
 
  }



  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {


     // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.post(this.globals.get("apiBase")+'usersapi/signup',credentials)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        resolve(this.data);
      });
  });


    // if (credentials.name === null || credentials.mobile === null) {
    //   return Observable.throw("Please insert details");
    // } else {
    //   // At this point store the credentials to your backend!
    //   return Observable.create(observer => {
    //     observer.next(true);
    //     observer.complete();
    //   });
    // }
  }
 


  public verifyUser(user) {


     // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.post(this.globals.get("apiBase")+'usersapi/verify',user)
      .map(res => res.json())
      .subscribe(data => {

        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        if(data.status =='success' || data.status =='exist')
        {
          this.storage.set('user', JSON.stringify(data.data));

          //   this.storage.get('user').then((value) => {
          //     console.log("value",value); 
          // }); 

          resolve(this.data);
        }
        else
        {
          resolve(null);
        }
      });
  });
  };
 
  public authoriseUser()  {

    return Observable.create(observer => {

      this.storage.get('user').then((value) => {         
        this.currentUser =  JSON.parse(value); 
        observer.next(this.currentUser);
        observer.complete();
    }); 

    });


  }; 
 
  public logout() {
    return Observable.create(observer => {

      this.currentUser = null;
      this.storage.set('user', null);
      observer.next(true);
      observer.complete();
    });
  }


}
