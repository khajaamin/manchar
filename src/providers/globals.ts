import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Categories provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Globals {
public globals; 
  constructor() {
   
      this.globals = {
          apiBase:"http://digipune.co.in/index.php?r=apiservice/",
          imageBase:"http://digipune.co.in/images/"
      }; 

      this.globals = {
          apiBase:"http://localhost/smartcity-yii/smartnar/public_html/index.php?r=apiservice/",
          imageBase:"http://localhost/smartcity-yii/smartnar/public_html/images/images/"
      }; 
      
  }; //End constructor

  get(key){

      return this.globals[key]; 
  }; 

  set(key,value){

      this.globals[key] = value; 
  }; 
}
