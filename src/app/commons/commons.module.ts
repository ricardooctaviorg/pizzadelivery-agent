import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { StatusGroupTitlePipe } from './pipes/status-group-title.pipe';


@NgModule({
  declarations: [
    HeaderComponent
    , HeaderMenuComponent
    , StatusGroupTitlePipe
  ],
  imports: [
    CommonModule
    , IonicModule
  ]
  ,exports:[
    HeaderComponent
    , HeaderMenuComponent
    , StatusGroupTitlePipe
  ]
})
export class CommonsModule { }
