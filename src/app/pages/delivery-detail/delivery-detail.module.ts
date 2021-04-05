import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryDetailPageRoutingModule } from './delivery-detail-routing.module';

import { DeliveryDetailPage } from './delivery-detail.page';
import { CommonsModule } from '../../commons/commons.module';
import { DetailItemsComponent } from './components/detail-items/detail-items.component';
import { DetailLocationComponent } from './components/detail-location/detail-location.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , DeliveryDetailPageRoutingModule
    , CommonsModule
  ],
  declarations: [
    DeliveryDetailPage
    , DetailLocationComponent
    , DetailItemsComponent
  ]
})
export class DeliveryDetailPageModule {}
