import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule } from '@angular/material';

@NgModule({
  imports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule 
  ],
  exports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule
  ]
})
export class AngularMaterialModule { }
