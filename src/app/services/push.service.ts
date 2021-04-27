import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { environment } from '../../environments/environment';

//const SENDER_ID     = environment.senderId;
//const APP_ID        = environment.onesignalAppId;

const SENDER_ID     = '633420006453';
const APP_ID        = '42f1b696-d432-4509-9b5c-90a3ecaa7c88';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  pushNotifications :any[]  = new Array();

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {

    console.log("initConfiguration ");
    this.oneSignal.startInit('db0c2938-e268-48ec-91e7-9142b9f5336b', '443931902638');


    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(( notification ) => {
      console.log("notification", notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
    // do something when a notification is opened
    });

    this.oneSignal.endInit();
    console.log("endinitConfiguration ");

  }

  notificationReceived( notification: OSNotification ){

    const payload = notification.payload;

    const existPush = this.pushNotifications.find(
      push =>{
        push.notificationID === payload.notificationID; 
      }
    );

    if( existPush )
      return ;

    this.pushNotifications.unshift(notification);

  }

}
