import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  //for material angular
import 'hammerjs'; //for material angular

//component imports
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { AlertTagListComponent } from './components/alert-tag-list/alert-tag-list.component';
import { AlertTagBannerComponent } from './components/alert-tag-banner/alert-tag-banner.component';
import { AlertTagPopupComponent } from './components/alert-tag-popup/alert-tag-popup.component';
import { PeopleAddComponent } from './components/people-add/people-add.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';
import { PeopleDetailViewComponent } from './components/people-detail-view/people-detail-view.component';
import { ControlComponent } from './components/control/control.component';
import { ControlCreateGroupComponent } from './components/control-create-group/control-create-group.component';
import { PeopleGroupAddComponent } from './components/people-group-add/people-group-add.component';

//module imports
import { RoutingModule } from './modules/routing/routing.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module'; //for material angular

//service imports
import { AppMaterializeService } from './services/app-materialize/app-materialize.service';
import { PeopleService } from './services/people/people.service';
import { PeopleDetailService } from './services/people-detail/people-detail.service';
import { PeopleSuperService } from './services/people-super/people-super.service';
import { AlertTagService } from './services/alert-tag/alert-tag.service';
import { PeopleGroupService } from './services/people-group/people-group.service';
import { GraphqlService } from './services/graphql/graphql.service';


@NgModule({
  entryComponents: [
    AlertTagPopupComponent
  ],
  declarations: [
    AppComponent,
    FrontPageComponent,
    NavigationComponent,
    PeopleDetailComponent,
    PeopleAddComponent,
    PeopleListComponent,
    PeopleDetailViewComponent,
    NotFoundComponent,
    AlertTagBannerComponent,
    AlertTagListComponent,
    AlertTagPopupComponent,
    ControlComponent,
    ControlCreateGroupComponent,
    PeopleGroupAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RoutingModule,
    AngularMaterialModule
  ],
  providers: [
    AppMaterializeService,
    PeopleService,
    PeopleDetailService,
    PeopleSuperService,
    AlertTagService,
    PeopleGroupService,
    GraphqlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
