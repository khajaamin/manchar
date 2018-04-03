import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Bus} from '../../providers/bus';
import { BusdetailsPage } from '../busdetails/busdetails';
import {Globals} from '../../providers/globals';

/*
  Generated class for the Buslist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buslist',
  templateUrl: 'buslist.html'
})
export class BuslistPage {
public selectedItem; 
public busdestList; 
public IMG_BASE; 
public backupDestList; 
public homeSearch; 
  constructor(public busProvider:Bus,public navCtrl: NavController, public navParams: NavParams, public globals:Globals) {
    this.selectedItem = navParams.get('item');
    this.IMG_BASE = this.globals.get("imageBase");
    this.loadBusDestList(this.selectedItem.source);
    this.homeSearch = ""; 
  }

  ionViewDidLoad() {

  };

    loadBusDestList(source){
    this.busProvider.loadDestinationList(source)
    .then(data => {
      this.busdestList = data;
      this.backupDestList = this.busdestList; 
    });
  };

destSelected(event,source,item){  
    this.navCtrl.push(BusdetailsPage,{
      destination: item.destination,
      source:source
    });
};


 searchDestination(ev: any) {
    let val = ev.target.value;
      if(val)
      {
            this.busdestList = this.busdestList.filter((item) => {
            if(item)
            {
              return (item.destination.toLowerCase().indexOf(val.toLowerCase()) > -1);
            }
          });
      }
      else
      {
        this.busdestList = this.backupDestList; 
      }
  };

}
