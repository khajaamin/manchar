import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,Loading } from 'ionic-angular';
import {Categories} from '../../providers/categories';
import {Bus} from '../../providers/bus';
import { VendorsPage } from '../vendors/vendors';
import { BuslistPage } from '../buslist/buslist';

import {Globals} from '../../providers/globals';

/*
  Generated class for the Subcategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
  providers: [ Categories ,Globals,Bus],
})

export class SubcategoryPage {
public selectedItem; 
public subCategoriesList;
public IMG_BASE; 
public busSources; 
loading: Loading;
public enableSection ="bus";
public homeSearch; 
public backupSourceList; 
  constructor(public busProvider:Bus,public navCtrl: NavController, public navParams: NavParams,public categories: Categories, public globals:Globals, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.homeSearch = ""; 
        this.selectedItem = navParams.get('item');

        this.IMG_BASE =  this.globals.get("imageBase"); 
      this.subCategoriesList = [];     
      if(this.selectedItem.id == 2)
      {
        this.enableSection = 'bus';
        this.loadBusSourceList();  
      }
      else
      {
        this.enableSection = 'categories';
        this.loadSubCategory();
      }

  }

loadSubCategory(){
  this.showLoading();
    this.categories.loadSubCategories(this.selectedItem.id)
    .then(data => {
      this.subCategoriesList = data;
       this.loading.dismiss();

    },error=>{
             this.loading.dismiss();
    });
  };

  loadBusSourceList(){
    this.busProvider.loadSourceList()
    .then(data => {
      this.busSources = data;
      this.backupSourceList = this.busSources; 
      console.log( this.busSources); 
    },error=>{
             this.loading.dismiss();
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoryPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VendorsPage,{
      item: item
    });
  };

   sourceSelected(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(BuslistPage,{
      item: item
    });
  };

   showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  };


 searchSource(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
      if(val)
      {
            this.busSources = this.busSources.filter((item) => {
            if(item)
            {
              return (item.source.toLowerCase().indexOf(val.toLowerCase()) > -1);
            }
          });
      }
      else
      {
        this.busSources = this.backupSourceList; 
      }
  };
  
}
