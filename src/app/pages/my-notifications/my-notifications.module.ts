import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyNotificationsPageRoutingModule } from './my-notifications-routing.module';

import { MyNotificationsPage } from './my-notifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyNotificationsPageRoutingModule
  ],
  declarations: [MyNotificationsPage]
})
export class MyNotificationsPageModule {}
