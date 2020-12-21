import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyConfigurationPage } from './my-configuration.page';

const routes: Routes = [
  {
    path: '',
    component: MyConfigurationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyConfigurationPageRoutingModule {}
