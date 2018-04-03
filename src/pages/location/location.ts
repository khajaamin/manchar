import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/*
  Generated class for the Location page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  public selectedItem; 
    map: any;
    directionsService: any; 
    directionsDisplay: any;


  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    console.log(this.selectedItem); 
  }


  ionViewDidLoad() {
     this.loadMap(this.selectedItem);

  }

 loadMap(item){
 
  let latLng = new google.maps.LatLng(item.latitude,item.lognitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.directionsDisplay.setMap(this.map);
      this.addMarker(item); 
  };

  addMarker(item){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>"+item.shop_name+"!</h4>";          
 
  this.addInfoWindow(marker, content);
 
};

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
};


showWay()
{
    this.geolocation.getCurrentPosition().then((resp) => {
   
    let origin =new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude); 
    console.log(resp.coords.latitude); 
    let destination = new google.maps.LatLng(this.selectedItem.latitude,this.selectedItem.lognitude);
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay,origin,destination);
    // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
};

calculateAndDisplayRoute(directionsService, directionsDisplay,origin,destination) {
        directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log(status); 
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  };

// loadMap(item) {
//  // make sure to create following structure in your view.html file
//  // <ion-content>
//  //  <div #map id="map" style="height:100%;"></div>
//  // and add a height (for example 100%) to it, else the map won't be visible
//  // </ion-content>

//  // create a new map by passing HTMLElement
//  let element: HTMLElement = document.getElementById('map');

//  let map: GoogleMap = this.googleMaps.create(element);

//  // listen to MAP_READY event
//  // You must wait for this event to fire before adding something to the map or modifying it in anyway
//  map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

//  // create LatLng object
//  let ionic: LatLng = new LatLng(item.latitude,item.lognitude);

//  // create CameraPosition
//  let position: CameraPosition = {
//    target: ionic,
//    zoom: 18,
//    tilt: 30
//  };

//  // move the map's camera to position
//  map.moveCamera(position);

//  // create new marker
//  let markerOptions: MarkerOptions = {
//    position: ionic,
//    title: 'Ionic'
//  };

//    map.addMarker(markerOptions)
//    .then((marker: Marker) => {
//       marker.showInfoWindow();
//     });
//  }; //end of loadMap


}
