import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { StatusGroupTitlePipe } from './pipes/status-group-title.pipe';
import { StatusDeliveryIcon } from './pipes/status-delivery-icon.pipe';
import { StatusDeliveryTitlePipe } from './pipes/status-delivery-title.pipe';
import { DetailTypeTitlePipe } from './pipes/detail-type-title.pipe';
import { TypeFailTitlePipe } from './pipes/type-fail-title.pipe';


@NgModule({
  declarations: [
    HeaderComponent
    , HeaderMenuComponent
    , StatusGroupTitlePipe
    , StatusDeliveryIcon
    , StatusDeliveryTitlePipe
    , DetailTypeTitlePipe
    , TypeFailTitlePipe
  ],
  imports: [
    CommonModule
    , IonicModule
  ]
  ,exports:[
    HeaderComponent
    , HeaderMenuComponent
    , StatusGroupTitlePipe
    , StatusDeliveryIcon
    , StatusDeliveryTitlePipe
    , DetailTypeTitlePipe
    , TypeFailTitlePipe
  ]
})
export class CommonsModule { }
