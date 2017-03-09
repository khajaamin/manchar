import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Categories} from '../../providers/categories';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [ Categories ],
})
export class HomePage {
public categoriesList;
public IMG_BASE; 

  constructor(public navCtrl: NavController, public navParams: NavParams,public categories: Categories) {
    this.IMG_BASE = "http://www.smartnarayangaon.com/images/"; 
     this.loadPeople();

     this.categoriesList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

 loadPeople(){
    this.categories.load()
    .then(data => {
      this.categoriesList = data;
      console.log(this.categoriesList);
    });
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(HomePage,{
      item: item
    });
  }

}
