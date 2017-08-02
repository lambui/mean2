import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//component imports
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';

//module imports
import { RoutingModule } from './modules/routing/routing.module';

//service imports
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
    RoutingModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
