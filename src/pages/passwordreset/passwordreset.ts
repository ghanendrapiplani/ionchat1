import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { newuser } from '../../models/interfaces/newuser';
import { ResetpassProvider } from '../../providers/resetpass/resetpass';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  creds = {} as newuser;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public resetpass: ResetpassProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }

  sendpassresetmail() {
    var toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    })
    if (this.creds.email == '') {
      toast.setMessage('Please enter email');
      toast.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      })
      loader.present();
      this.resetpass.sendEmail(this.creds.email).then((res: any) => {
        if (res.success) {
          let alert = this.alertCtrl.create({
            buttons: ['Ok']
          });
          loader.dismiss();
          alert.setTitle('Email Sent');
          alert.setSubTitle('Please follow the instructions in the email');
          alert.present();
          alert.onDidDismiss(()=>{
            console.log('alert dismissed');
            this.navCtrl.push('LoginPage');
          })
          console.log("email send alert display??");
        }
        else{
          loader.dismiss();
          alert('Error'); 
          console.log("error sendign mail alert??");
        }
      })
    }
  }

}
