import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Bus} from '../../providers/bus';
import {Globals} from '../../providers/globals';

/*
  Generated class for the Busdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-busdetails',
  templateUrl: 'busdetails.html'
})
export class BusdetailsPage {
public buslist; 
public IMG_BASE; 
public source; 
public destination; 
  constructor(public busProvider:Bus,public navCtrl: NavController, public navParams: NavParams, public globals:Globals) {
    console.log(navParams.get('destination'),navParams.get('source'));
    this.IMG_BASE = this.globals.get("imageBase");
    this.source = navParams.get('source'); 
    this.destination = navParams.get('destination'); 
    this.loadBusList(navParams.get('source'),navParams.get('destination'));

  }

  ionViewDidLoad() {

  }

   loadBusList(source,destination){
    this.busProvider.loadSourceDestinationList(source,destination)
    .then(data => {
      this.buslist = data;
      
    });
  };

}
