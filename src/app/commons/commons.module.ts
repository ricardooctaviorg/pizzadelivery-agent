import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [
    HeaderComponent
    , HeaderMenuComponent
  ],
  imports: [
    CommonModule
    , IonicModule
  ]
  ,exports:[
    HeaderComponent
    , HeaderMenuComponent
  ]
})
export class CommonsModule { }
