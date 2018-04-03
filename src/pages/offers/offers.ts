import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Globals} from '../../providers/globals';
import {Vendors} from '../../providers/vendors';
/*
  Generated class for the Offers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
    providers:[Vendors]

})
export class OffersPage {
  public offers  ; 
  public IMG_BASE; 
  constructor(public vendors:Vendors,public navCtrl: NavController, public navParams: NavParams,public globals:Globals) {
  this.IMG_BASE = this.globals.get("imageBase"); 
    this.vendors.loadOffers().then(data=>{
        this.offers = data; 
      }); ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');

  }

}
