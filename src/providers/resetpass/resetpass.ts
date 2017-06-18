import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { newuser } from '../../models/interfaces/newuser';
import firebase from 'firebase';

/*
  Generated class for the ResetpassProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ResetpassProvider {

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello ResetpassProvider Provider');
  }

  sendEmail(email:string){
    var promise = new Promise((resolve,reject)=>{
      this.afireauth.auth.sendPasswordResetEmail(email).then(()=>{
        resolve({success:true});
      }).catch((err)=>{
        reject(err);
      })
    })

    return promise;
  }
}
