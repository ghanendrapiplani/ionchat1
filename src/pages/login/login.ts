import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';

import { SignupPage } from '../../pages/signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    let loader=this.loadingCtrl.create({
      content:'Please wait'
    })
    loader.present();
    this.authservice.login(this.credentials).then((res: any) => {
      loader.dismiss();
      if (!res.code)
        this.navCtrl.setRoot('TabsPage');
      else
        alert(res);
    })
  }

  passwordreset(){
    this.navCtrl.push('PasswordresetPage');
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
