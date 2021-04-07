import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTypingFailPageRoutingModule } from './modal-typing-fail-routing.module';

import { ModalTypingFailPage } from './modal-typing-fail.page';
import { CommonsModule } from '../../commons/commons.module';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , ModalTypingFailPageRoutingModule
    , CommonsModule
  ],
  declarations: [ModalTypingFailPage]
})
export class ModalTypingFailPageModule {}
