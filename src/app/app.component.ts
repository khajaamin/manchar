import { Component, ViewChild,enableProdMode } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import {AdddetailPage} from '../pages/adddetail/adddetail';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/authservice';
import {Globals} from '../providers/globals';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
  styleUrls: [
        'http://smartnarayangoan.com/ionic_app.css'        
    ], 
})
export class MyApp {
  public loading; 
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
public IMG_BASE 
public currentUser; 
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public auth:AuthService,public globals:Globals, public storage: Storage) {
  this.IMG_BASE = this.globals.get("imageBase"); 

 this.storage.get('user').then((value) => {
        
        this.currentUser =  JSON.parse(value); 
          });

    this.initializeApp();

   this.auth.authoriseUser().subscribe((value) => {
        
        if(value)
        {
           this.rootPage  = HomePage;
        }
        else
        {
          this.rootPage  = SignupPage; 
        }
           
    }); ;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List Your Business', component: AdddetailPage },
      {title:"About Us",component:AboutusPage},
      {title:"Contact Us",component:ContactusPage}               
    ];

    }

         

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      if (this.platform.is('ios') || this.platform.is('android')) {
                enableProdMode();
      }
            
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Home')
    {
      this.nav.setRoot(page.component);
    }
    else
    {
      this.nav.push(page.component);
    }
  }
}
