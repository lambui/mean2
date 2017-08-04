import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from '../../components/front-page/front-page.component';
import { PeopleDetailComponent } from '../../components/people-detail/people-detail.component';

const routes: Routes = [
  { path: 'front', component: FrontPageComponent },
  { path: 'front/detail/:peopleId', component: PeopleDetailComponent }
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
