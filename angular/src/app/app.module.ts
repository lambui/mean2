import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  //for material angular
import 'hammerjs'; //for material angular

//component imports
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { PeopleDetailComponent } from './components/people-detail/people-detail.component';

//module imports
import { RoutingModule } from './modules/routing/routing.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module'; //for material angular

//service imports
import { AppMaterializeService } from './services/app-materialize/app-materialize.service';
import { PeopleService } from './services/people/people.service';
import { PeopleDetailService } from './services/people-detail/people-detail.service';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    NavigationComponent,
    PeopleDetailComponent
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
    PeopleDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
