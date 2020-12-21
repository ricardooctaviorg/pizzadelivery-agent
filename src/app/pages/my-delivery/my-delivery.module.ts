import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule }      from '@ionic/angular';

import { MyDeliveryPageRoutingModule } from './my-delivery-routing.module';
import { MyDeliveryPage } from './my-delivery.page';
import { DeliveryListComponent } from './componenets/delivery-list/delivery-list.component';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { CountPendingService } from '../../services/count-pending.service';
import { CommonsModule } from '../../commons/commons.module';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from '../../services/storage.service';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , MyDeliveryPageRoutingModule
    , HttpClientModule
    , CommonsModule
    , IonicStorageModule.forRoot()
  ],
  declarations: [
    MyDeliveryPage
    , DeliveryListComponent
  ]
  , providers:[
    DeliveryAgentService
    , CountPendingService
    , StorageService
  ]
})
export class MyDeliveryPageModule {}
