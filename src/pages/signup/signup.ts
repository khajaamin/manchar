import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController,Loading } from 'ionic-angular';
import { AuthService } from '../../providers/authservice';
import { VerifyPage } from '../verify/verify';
import { HomePage } from '../home/home';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: Loading;
  private signupFrm : FormGroup;
  public loggedInUser; 
  user = {name:"",mobile:"",email: ''};
  constructor(public navCtrl: NavController,public auth:AuthService, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController,private formBuilder: FormBuilder, public storage: Storage) {

this.signupFrm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [''],
      mobile: ['',Validators.compose([Validators.maxLength(10),Validators.minLength(10),Validators.required])],
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  };

   
  public registerUser() {
    this.showLoading()
    this.auth.register(this.user).then(res=>{             
      this.loggedInUser = res;       
      if (this.loggedInUser) {
          setTimeout(() => {
          this.loading.dismiss();
          this.storage.set('user', JSON.stringify(this.loggedInUser.data));
          this.navCtrl.setRoot(HomePage,{
            mobile: this.user.mobile
          });

        });
      } else {
        this.showError("Invalid Details");
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
