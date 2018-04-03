import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';
/*
  Generated class for the Contactus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
  providers:[CallNumber]
})
export class ContactusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public callNumber: CallNumber) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

    phoneCall(mobile)
  {
    this.callNumber.callNumber(mobile, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    
    };

}
