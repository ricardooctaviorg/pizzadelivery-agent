import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyConfigurationPageRoutingModule } from './my-configuration-routing.module';

import { MyConfigurationPage } from './my-configuration.page';
import { CommonsModule } from '../../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyConfigurationPageRoutingModule,
    CommonsModule
  ],
  declarations: [MyConfigurationPage]
})
export class MyConfigurationPageModule {}
