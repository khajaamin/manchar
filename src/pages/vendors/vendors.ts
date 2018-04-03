import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,Loading  } from 'ionic-angular';
import {Vendors} from '../../providers/vendors';

import { VendorPage } from '../vendor/vendor';
import { AdddetailPage } from '../adddetail/adddetail';

import {Globals} from '../../providers/globals';
import {CallNumber} from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the Vendors page.import { VendorPage } from '../vendor/vendor';
import { VendorPage } from '../vendor/vendor';
import { VendorPage } from '../vendor/vendor';


  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vendors',
  templateUrl: 'vendors.html',
  providers:[Vendors,Globals,CallNumber]
  
})
export class VendorsPage {
public selectedItem; 
public subCategory; 
public vendorsList;
public vendorsListAvailable; 
loading: Loading;
public IMG_BASE; 
  constructor(private socialSharing: SocialSharing,public callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams,public vendors:Vendors, public globals:Globals, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.selectedItem = navParams.get('item');
    this.IMG_BASE =  this.globals.get("imageBase"); 
      this.vendorsList = []
      this.vendorsListAvailable =true;     
      this.loadVendors(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorsPage');
  }

  loadVendors(){
this.showLoading();
        this.vendors.loadVendors(this.selectedItem.id).then(data=>{
          if(data.length > 0 )
          {
                this.vendorsList = data; 
                this.vendorsListAvailable = true; 
                
          }
          else{
                this.vendorsListAvailable = false; 
          }
          this.loading.dismiss();

        });

  }; 

addWithUs()
{
    this.navCtrl.push(AdddetailPage);
}; 

   showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  };


  itemTapped(event, item,subCategory) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VendorPage,{
      item: item,
      subCategory:subCategory
    });
  };

   phoneCall(item)
  {
    this.callNumber.callNumber(item.mobile, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    
    };

    regularShare(item){
        let shareMsg =item.shop_name+" is located at " +item.shop_address +"Contact No :"+item.mobile ; 
        let shareImage = this.IMG_BASE + item.shop_image; 
        let shareUrl =  "http://sdadvertisements.com";
        
        this.socialSharing.share(shareMsg,null/*Subject*/,null/*File*/,shareUrl )
        .then(()=>{
            
          },
          ()=>{
            
          }); 


  };

}
