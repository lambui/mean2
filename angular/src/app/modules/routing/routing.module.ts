import { PeopleAddComponent } from '../../components/people-add/people-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from '../../components/front-page/front-page.component';
import { PeopleDetailComponent } from '../../components/people-detail/people-detail.component';
import { PeopleDetailViewComponent } from '../../components/people-detail-view/people-detail-view.component';

const routes: Routes = [
  { path: 'people', component: FrontPageComponent },
  { path: 'people/add', component: PeopleAddComponent },
  { path: 'people/:peopleId/detail', component: PeopleDetailComponent },
  { path: 'people/:peopleId/detail/:detailId', component: PeopleDetailViewComponent }
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
