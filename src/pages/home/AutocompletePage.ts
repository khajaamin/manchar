import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {} from '@types/googlemaps';


@Component({
  templateUrl: 'autocomplete.html'
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;

  latitude: number = 18.4474889;
  longitude: number = 73.82322550000004;
  geo: any
  service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, private zone: NgZone) {
 

    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({
         input: this.autocomplete.query+ " Pune",
                        
        componentRestrictions: {country: 'IN'}
         }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
          if((predictions &&  predictions.length > 0))
          {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction.description);
                });
          }
      });
    });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    console.log("lat: " + this.latitude + ", long: " + this.longitude);
   });
 }
}