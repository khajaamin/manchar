import { Component,NgZone } from '@angular/core';
import { NavController,ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the LocationSelector page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location-selector',
  templateUrl: 'location-selector.html'
})
export class LocationSelectorPage {

   autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone) {
     this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationSelectorPage');
  }

}
