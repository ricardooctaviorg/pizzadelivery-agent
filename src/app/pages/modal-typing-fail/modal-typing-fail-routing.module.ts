import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTypingFailPage } from './modal-typing-fail.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTypingFailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTypingFailPageRoutingModule {}
