import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AgentDeliveryGuard } from './guards/agent-delivery.guard';

const routes: Routes = [
  {
    path: 'myDelivery'
    , loadChildren: () => import('./pages/my-delivery/my-delivery.module').then( m => m.MyDeliveryPageModule)
    , canLoad: [
      AgentDeliveryGuard
    ]
  },
  {
    path: 'delivery-detail/:deliveryId/:statusId/:nameCustomer/:phoneCustomer/:assignDate/:deliveryDate',
    loadChildren: () => import('./pages/delivery-detail/delivery-detail.module').then( m => m.DeliveryDetailPageModule)
    , canLoad: [
      AgentDeliveryGuard
    ]
  },
  {
    path: 'my-configuration',
    loadChildren: () => import('./pages/my-configuration/my-configuration.module').then( m => m.MyConfigurationPageModule)
    , canLoad: [
      AgentDeliveryGuard
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
  ,
  {
    path: 'modal-typing-fail',
    loadChildren: () => import('./pages/modal-typing-fail/modal-typing-fail.module').then( m => m.ModalTypingFailPageModule)
    /*, canLoad: [
      AgentDeliveryGuard
    ]*/
  },{
    path: ''
    , pathMatch: 'full'
    , redirectTo: 'login'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
