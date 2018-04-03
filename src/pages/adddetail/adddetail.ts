import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Geolocation } from '@ionic-native/geolocation';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {Vendors} from '../../providers/vendors';

import { HomePage } from '../home/home';


/*
  Generated class for the Adddetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adddetail',
  templateUrl: 'adddetail.html',
   providers: [Vendors ],
})
export class AdddetailPage {
public base64Image: string;
public data; 
public http; 
public error; 
private vendorFrm : FormGroup;
public vendor; 
public map; 
constructor(public toastCtrl: ToastController,private geolocation: Geolocation,public vendors:Vendors, public platform: Platform,public navCtrl: NavController, public navParams: NavParams,http: Http,private formBuilder: FormBuilder) {



this.vendorFrm = this.formBuilder.group({
      shopname: ['', Validators.required],
      shopaddress: ['',Validators.required],
      zipcode: ['',Validators.required],      
      contactno: ['',Validators.required],
      email: [''],
      optcontact: [''],
      owner: ['',Validators.required],
      to: ['',Validators.required],
      from: ['',Validators.required],
      weeklyoff: [''],
      description:['']
    });

      this.vendor = {}; 

       this.data = {};
        this.data.username = 'ammin';
        this.data.response = '';
 
        this.http = http;

        platform.ready().then(() => {
            this.loadMap();
        });


  } // END of constructor 


 presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  };


/**
 * @function - Loading map on detail page method
 */
loadMap(){
    

    //    let location = new LatLng(-18.21, 123.12);

    // resp.coords.latitude
    // resp.coords.longitude

    // let location = new GoogleMapsLatLng(-18.21, 123.12);
    
    //         this.map = new GoogleMap('map', {
    //           'backgroundColor': 'white',
    //           'controls': {
    //             'compass': true,
    //             'myLocationButton': true,
    //             'indoorPicker': true,
    //             'zoom': true
    //           },
    //           'gestures': {
    //             'scroll': true,
    //             'tilt': true,
    //             'rotate': true,
    //             'zoom': true
    //           },
    //           'camera': {
    //             'latLng': location,
    //             'tilt': 30,
    //             'zoom': 15,
    //             'bearing': 50
    //           }
    //         });

    //         this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    //             console.log('Map is ready!');
    //         });

      


 
    } // END loadMap



  addSumitForm(){

    if(this.vendor.weeklyoff)
    {
      this.vendor.weeklyoff = this.vendor.weeklyoff.join(); 
    }
    else
    {
      this.vendor.weeklyoff = "Never";
    }
    this.vendors.addVendor(this.vendor).then(data=>{
            if(data)
            {
              let  selectedItem = data; 
              this.presentToast("Your buisiness submited successfully. Will be activated after review.");
              this.navCtrl.push(HomePage,{
                item: selectedItem
              });
            } 
        })


  }

}
