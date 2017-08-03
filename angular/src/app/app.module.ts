import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  //for material angular
import 'hammerjs'; //for material angular

//component imports
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';

//module imports
import { RoutingModule } from './modules/routing/routing.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module'; //for material angular

//service imports
import { AppMaterializeService } from './services/app-materialize/app-materialize.service';
import { PeopleService } from './services/people/people.service';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    NavigationComponent
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
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
