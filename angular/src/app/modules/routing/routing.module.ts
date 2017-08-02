import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from '../../components/front-page/front-page.component';

const routes: Routes = [
  { path: 'front', component: FrontPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
