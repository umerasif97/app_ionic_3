import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPage } from '../add/add';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import moment from 'moment';


/**
 * Generated class for the CurrentItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-items',
  templateUrl: 'current-items.html',
})
export class CurrentItemsPage {
  
  currentItems = [];
  info;
  allItems = {};
  items: FirebaseListObservable<any[]>;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {
    //this.items = db.list('info');
  }

  ionViewDidLoad() {
    let self = this;
    this.info = firebase.database().ref('/info').on('value', function (snapshot) {
      self.allItems = snapshot.val(); 
      self.currentItems = [];
      for (var key in self.allItems) {
        //console.log(self.allItems[key]);
        if ((new Date(self.allItems[key].expiryDate).valueOf() - Date.now()) >= 0) {
          self.allItems[key]['key'] = key;
          self.currentItems.push(self.allItems[key]);
          //console.log(self.currentItems.push(self.allItems[key]));   
        } 
        // else {
        //   self.previousItems.push(self.allItems[key]);
        // }
      }
      //console.log(snapshot.val());
    });
  }


  add() {
    this.navCtrl.push(AddPage);
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  editItem(item) {
    var duration = moment.duration((new Date(item.expiryDate).valueOf() - new Date(item.reminder).valueOf()), 'milliseconds');
    var days = duration.asDays();
    this.navCtrl.push(AddPage, {
      key: item.key,
      id: item.id,
      name: item.name,
      picture: item.imageURL,
      expiryDate: item.expiryDate,
      reminder: days
    });
    //console.log(days);
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let index = this.currentItems.indexOf(item);
            if(index > -1){
              this.currentItems.splice(index, 1);
              console.log(item.key);  
              this.db.object('info/' + item.key).remove();
              //this.items.remove(item);
            }
            let alert1 = this.alertCtrl.create({
              title: 'Successfully Deleted!',
              subTitle: 'You have successfully deleted the item.',
              buttons: ['Ok']
            });
            alert1.present();
          }
        }
      ]
    });
    alert.present();
  }
}