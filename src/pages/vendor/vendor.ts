import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,Loading  } from 'ionic-angular';
import {Vendors} from '../../providers/vendors';
import {Globals} from '../../providers/globals';
import {CallNumber} from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthService } from '../../providers/authservice';

import { LocationPage } from '../location/location';

/*
  Generated class for the Vendor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
  providers:[Vendors,Globals,CallNumber,AuthService]
})
export class VendorPage {
public selectedItem; 
public item;
loading: Loading;
public IMG_BASE; 
public subCategory; 
public shareMsg; 
public shareImage; 
public shareUrl; 
constructor(public auth:AuthService,private socialSharing: SocialSharing,public callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams,public vendors:Vendors, public globals:Globals, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
      this.selectedItem = navParams.get('item');      
      this.subCategory = navParams.get("subCategory"); 
      this.IMG_BASE =  this.globals.get("imageBase"); 
      this.item = {};     
      this.loadVendor();


  }

  loadVendor(){
        this.showLoading();
        if(this.selectedItem.id)
        {
            this.vendors.loadVendor(this.selectedItem.id).then(data=>{              
              this.item = data; 
              this.loading.dismiss();

              this.shareMsg = this.item.shop_name+" is located at " +this.item.shop_address +", Contact No:"+this.item.mobile ; 
              this.shareImage = this.IMG_BASE + this.item.shop_image; 
              this.shareUrl =  "http://sdadvertisements.com";

            });
        }
  }; 

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorPage');
  }

  phoneCall(item)
  {
    this.callNumber.callNumber(item.mobile, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    
    };


 shareDetails(item)
  {
    this.callNumber.callNumber(item.mobile, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));    
  };


  addRatings(rate)
  {
      this.showLoading();
      this.auth.authoriseUser().subscribe((user) => {            
        
          if(user !== null)
          {
            this.vendors.addRatings({id:this.item.id,rate:rate,user_id:user.id}).then(data=>{
            this.loading.dismiss();            
            },error => {
              this.showError(error);
            });
          }
          else{
            this.showError("Please Login Again");
          }                
    }); 
  };

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  };

  getLocation(item)
  {
      this.navCtrl.push(LocationPage,{
        item: item
      });
  }; 

  regularShare(item){
    // share(message, subject, file, url)
    this.socialSharing.share(item.shop_name+" is located at " +item.shop_address +"Contact No :"+item.mobile , "www/assets/img/hulk.jpg", "wwww.sdadvertisements.com"); 
      let msg = item.shop_name+" is located at " +item.shop_address +"Contact No :"+item.mobile ; 
      let image = this.IMG_BASE + item.shop_image; 
      this.socialSharing.share(msg,null/*Subject*/,null/*File*/,"http://sdadvertisements.com")

    .then(()=>{
        
      },
      ()=>{
        
      })
  };

    showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  };


 whatsappShare(){
    this.socialSharing.shareViaWhatsApp(this.shareMsg, null /*Image*/,  "http://pointdeveloper.com/" /* url */)
      .then(()=>{
        
      },
      ()=>{
         
      })
  }
 
  twitterShare(){
    this.socialSharing.shareViaTwitter(this.shareMsg,null /*Image*/,this.shareUrl)
    .then(()=>{
        
      },
      ()=>{
         
      })
  }
 
  facebookShare(){
    this.socialSharing.shareViaFacebook(this.shareMsg,null /*Image*/,this.shareUrl)
    .then(()=>{
        
      },
      ()=>{
         
      })
  }
 
  otherShare(){
    this.socialSharing.share(this.shareMsg,null/*Subject*/,null/*File*/,this.shareUrl )
    .then(()=>{
        
      },
      ()=>{
         
      })
 
  }

}
