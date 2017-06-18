import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { newuser } from '../../models/interfaces/newuser';
import { RegisterProvider } from '../../providers/register/register';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  creds = {} as newuser;
  constructor(public navCtrl: NavController, public registerprovider: RegisterProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup pge', );
  }

  goback() {
    this.navCtrl.push('LoginPage');
  }

  registeruser() {
    var toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    if (this.creds.email == '' || this.creds.password == '' || this.creds.displayName == '') {
      toast.setMessage('Please fill all details');
      toast.present();
    }
    else if (this.creds.password.length < 7) {
      toast.setMessage('Password should be atleast 7 characters long');
      toast.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Please wait"
      })
      loader.present();
      this.registerprovider.adduser(this.creds).then((res: any) => {
        if (res.success) {
          this.navCtrl.push('ProfilePage');
          loader.dismiss();
        }
        else
          alert('Error, please try again');
      })
    }
  }
}
