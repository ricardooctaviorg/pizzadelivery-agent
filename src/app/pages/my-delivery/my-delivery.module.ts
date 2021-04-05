import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule }      from '@ionic/angular';

import { MyDeliveryPageRoutingModule } from './my-delivery-routing.module';
import { MyDeliveryPage } from './my-delivery.page';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { DeliveryAgentService } from 'src/app/services/delivery-agent.service';
import { CommonsModule } from '../../commons/commons.module';
//import { StorageService } from '../../commons/services/storage.service';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , MyDeliveryPageRoutingModule
    , HttpClientModule
    , CommonsModule
  ],
  declarations: [
    MyDeliveryPage
    , DeliveryListComponent
  ]
  , providers:[
    DeliveryAgentService
    //, StorageService
  ]
})
export class MyDeliveryPageModule {}
