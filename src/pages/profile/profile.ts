import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { RegisterProvider } from '../../providers/register/register';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
    public zone: NgZone, public userservice: RegisterProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  chooseimage(){
    let loader=this.loadingCtrl.create({
      content:'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl:any)=>{
        loader.dismiss();
        this.zone.run(()=>{
          this.imgurl=uploadedurl;
          this.moveon=false;
        })
    })
  }

  updateproceed(){
    let loader=this.loadingCtrl.create({
      content:'Please wait'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res:any)=>{
      if(res.success){
        this.navCtrl.setRoot('TabsPage');
      }
      else{
        alert('Error'+res);
      }
    })
  }
  
  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

}
