import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';
import moment from 'moment';
import { TabsPage } from '../tabs/tabs';
import { TabsService } from '../tabs/tabs.service';


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  info: FirebaseListObservable<any[]>;
  item = { key: '', id: '', name: '', picture: '', expiryDate: '', reminder: '' };
  imageURL;
  minDate;
  maxDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private camera: Camera,
    public alertCtrl: AlertController,
    public localNotifications: LocalNotifications,
    public tabs: TabsService) {
    this.minDate = moment.utc().startOf('day').add(1, 'day').format('YYYY-MM-DD');
    this.maxDate = moment.utc().add(5, 'y').format('YYYY-MM-DD');
    this.info = db.list('/info');
    this.item.key = this.navParams.get('key');
    this.item.id = this.navParams.get('id');
    this.item.name = this.navParams.get('name');
    this.item.picture = this.navParams.get('picture');
    this.item.expiryDate = this.navParams.get('expiryDate');
    this.item.reminder = this.navParams.get('reminder');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }
  // ionViewWillEnter() {
  //   this.tabs.hide();
  // }

  // ionViewWillLeave() {
  //   this.tabs.show();
  // }

  back() {
    this.navCtrl.pop();
  }

  takePhoto() {

    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      //      targetWidth: 1000,
      //      targetHeight: 1000
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this.imageURL = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });

  }


  accessGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.imageURL = 'data:image/jpeg;base64,' + imageData;
      console.log(this.imageURL);
    }, (err) => {
      // let errAlert = this.alertCtrl.create({
      //   title: err,
      //   buttons: ['OK']
      // });
      // errAlert.present();
      console.log(err);
    });
  }



  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }


  addItem(name, expiryDate, reminder) {
    let notificationDay = new Date(expiryDate);
    notificationDay.setDate(notificationDay.getDate() - reminder);
    let notificationDateDay = moment(notificationDay).format('YYYY-MM-DD');
    //console.log(notificationDateDay);

    if (reminder == 1) {
      let notification = {
        title: 'POST EXPIRY',
        text: 'Your post is about to expire in 1 day',
        at: notificationDateDay
      }
      //console.log(notification);
      this.localNotifications.schedule(notification);
    } else if (reminder == 3) {
      let notification = {
        title: 'POST EXPIRY',
        text: 'Your post is about to expire in 3 days',
        at: notificationDateDay
      }
      //console.log(notification);
      this.localNotifications.schedule(notification);
    } else if (reminder == 5) {
      let notification = {
        title: 'POST EXPIRY',
        text: 'Your post is about to expire in 5 days',
        at: notificationDateDay
      }
      //console.log(notification);
      this.localNotifications.schedule(notification);
    }

    if (this.item.key) {
      this.info.update(this.item.key, {
        name: name,
        //picture: this.imageURL,
        expiryDate: expiryDate,
        reminder: notificationDateDay
      });
      let alert = this.alertCtrl.create({
        title: 'Successfully Updated!',
        subTitle: 'You have successfully updated the item.',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      this.info.push({
        id: this.guid(),
        name: name,
        //picture: this.imageURL,
        expiryDate: expiryDate,
        reminder: notificationDateDay
      });
      let alert1 = this.alertCtrl.create({
        title: 'Successfully Added!',
        subTitle: 'You have successfully added the item.',
        buttons: ['Ok']
      });
      alert1.present();
    }
  }
}