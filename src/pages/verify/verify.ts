import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,Loading  } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';
import { HomePage } from '../home/home';
/*
  Generated class for the Verify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {
loading: Loading;
  user = {name:"",mobile:"",otp: ''};
  data = {status:""}; 
  constructor(public navCtrl: NavController,public auth:AuthService, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.user.mobile = navParams.get('mobile');   
  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  };


   
  public verifyUser() {
    
    this.showLoading();
    this.auth.verifyUser(this.user).then(res=>{
          
      if (res) {      
        setTimeout(() => {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage)
        });
      } else {
        this.showError("Invalid OTP ");
      }
    },
    error => {
      this.showError(error);
    });
  };


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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


}
