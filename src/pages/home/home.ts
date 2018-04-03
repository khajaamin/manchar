import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { SubcategoryPage } from '../subcategory/subcategory';
import {Categories} from '../../providers/categories';
import {Vendors} from '../../providers/vendors';
import {Globals} from '../../providers/globals';
import { Geolocation } from '@ionic-native/geolocation';
import { OffersPage } from '../offers/offers';
import { VendorsPage } from '../vendors/vendors';
import {CallNumber} from '@ionic-native/call-number';
import { VendorPage } from '../vendor/vendor';
import { SocialSharing } from '@ionic-native/social-sharing';
import {LocationSelectorPage} from '../location-selector/location-selector';
import {AutocompletePage} from './AutocompletePage';
import {} from '@types/googlemaps';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [ Categories,Globals,Vendors ,CallNumber],

})
export class HomePage {
public categoriesList;
public IMG_BASE; 
public homeSearch; 
public items; 
public sliders; 
public subCategoriesList; 
public result; 
public vendorsList; 
 address;
options: any; 
  constructor(public vendors:Vendors,private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,public categories: Categories,public globals:Globals,public callNumber: CallNumber,private socialSharing: SocialSharing,public modalCtrl: ModalController) {
    this.IMG_BASE = this.globals.get("imageBase"); 
     this.categoriesList = [];     
     
    this.loadCategory();

    this.homeSearch =""; 
   
//    this.getLocation(); 
  this.address = {
      place: ''
    };

  };


  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      if(data)
      {         
        this.address.place = data.substr(0, data.indexOf(',')); ;
      }
    });
    modal.present();
  }

shoLoacationModal(){

   let modal = this.modalCtrl.create(LocationSelectorPage);
    modal.present();

}

visitOffers()
{
  this.navCtrl.push(OffersPage);     

}; 

getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {   
    console.log(resp.coords.latitude); 
    // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

}

  ionViewDidLoad() {
      this.loadSlider();

  }

doRefresh() {this.initializeItems();
  this.subCategoriesList = []; 
   this.categories.load()
    .then(data => {
   this.globals.set("loading",false); 
      this.categoriesList = data;
      this.initializeItems();
    });

}

 loadCategory(){
   this.globals.set("loading",true); 
    this.categories.load()
    .then(data => {
   this.globals.set("loading",false); 
      this.categoriesList = data;
      this.initializeItems();
    });
  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SubcategoryPage,{
      item: item
    });
  };

    subCategoryTapped(event, item) {
      if(item.parent_id == 0 )
      {
          // That's right, we're pushing to ourselves!
          this.navCtrl.push(SubcategoryPage,{
            item: item
          });
      }
      else
      {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(VendorsPage,{
          item: item
        });
      }
  };

onCancel(event)
{
  this.doRefresh(); 
}

initializeItems() {
    this.items = this.categoriesList; 
  }

 getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    if(val)
    {
        this.globals.set("loading",true); 
          this.categories.searchByName(val,1)
          .then(data => {
        this.globals.set("loading",false); 
            this.result = data;
            this.categoriesList = this.result.categories.filter((item, index) => item.parent_id == 0 );

            this.subCategoriesList = this.result.categories.filter((item, index) => item.parent_id > 0 );
            this.vendorsList = this.result.vendors; 
          });
    }
    else
    {
      this.homeSearch = null; 
      this.subCategoriesList = [];
    }

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
      
    //   this.items = this.items.filter((item) => {
    //     if(item)
    //     {
    //       return (item.category_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     }
    //   })
    // }
  }

  

 loadSlider(){
   
    this.vendors.loadSlider()
    .then(data => {   
      this.sliders = data;
      
    });
  }


vendorTapped(event, item,subCategory) {
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
    // share(message, subject, file, url)
    this.socialSharing.share(item.shop_name+" is located at " +item.shop_address +" Contact No :"+item.mobile , "Please Download", "www/assets/img/hulk.jpg", "wwww.sdadvertisements.com"); 
  };



}
