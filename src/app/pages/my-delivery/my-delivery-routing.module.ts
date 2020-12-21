import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDeliveryPage } from './my-delivery.page';

import { DeliveryListComponent } from './componenets/delivery-list/delivery-list.component';

const routes: Routes = [
  {
    path: ''
    , component: MyDeliveryPage
    , children:[
      {
        path: 'deliveryList/:statusDelivery'
        , component: DeliveryListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDeliveryPageRoutingModule {}
