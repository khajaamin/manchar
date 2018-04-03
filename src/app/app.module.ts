import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {AdddetailPage} from '../pages/adddetail/adddetail';
import { Geolocation } from '@ionic-native/geolocation';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { VendorsPage } from '../pages/vendors/vendors';
import { VendorPage } from '../pages/vendor/vendor';
import { BusdetailsPage } from '../pages/busdetails/busdetails';
import {Globals} from '../providers/globals';
import { AuthService } from '../providers/authservice';
import { Bus } from '../providers/bus';
import { Ionic2RatingModule } from 'ionic2-rating';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SignupPage } from '../pages/signup/signup';
import { Storage } from '@ionic/storage';
import { VerifyPage } from '../pages/verify/verify';
import { BuslistPage } from '../pages/buslist/buslist';
import { LocationPage } from '../pages/location/location';
import { OffersPage } from '../pages/offers/offers';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import {LocationSelectorPage} from '../pages/location-selector/location-selector';
import {AutocompletePage} from '../pages/home/AutocompletePage';
import {AdMobFree} from 'ionic-native/admob-free';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdddetailPage,
    SubcategoryPage,
    VendorsPage,
    VendorPage,
    SignupPage,
    VerifyPage,
    BuslistPage,
    BusdetailsPage,
    LocationPage,
    OffersPage,
    AboutusPage,
    ContactusPage,
    LocationSelectorPage,
    AutocompletePage
    
    
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdddetailPage,
    SubcategoryPage,
    VendorsPage,
    VendorPage,
    SignupPage,
    VerifyPage,
    BuslistPage,
    BusdetailsPage,
    LocationPage,
    OffersPage,
    AboutusPage,
    ContactusPage,
    LocationSelectorPage,
    AutocompletePage
        
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation,Globals, AuthService,SocialSharing,Storage,Bus]
})
export class AppModule {}
