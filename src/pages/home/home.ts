import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { AddPage } from '../add/add';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { CurrentItemsPage } from '../current-items/current-items';
import { PreviousItemsPage } from '../previous-items/previous-items';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = CurrentItemsPage;
  tab2Root: any = PreviousItemsPage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams
   ) {
  }

  ionViewDidLoad() {

  }
}