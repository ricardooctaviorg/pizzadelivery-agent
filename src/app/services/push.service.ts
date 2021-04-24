import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {

    this.oneSignal.startInit('42f1b696-d432-4509-9b5c-90a3ecaa7c88', '633420006453');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(( notification ) => {

      console.log("notification recived",notification);

    });

    this.oneSignal.handleNotificationOpened().subscribe(( notification ) => {

      console.log("notification open ",notification);

    });

    this.oneSignal.endInit();

  }
}
