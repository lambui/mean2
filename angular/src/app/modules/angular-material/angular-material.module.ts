import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule } from '@angular/material';

@NgModule({
  imports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
    MdSelectModule
  ],
  exports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
    MdSelectModule
  ]
})
export class AngularMaterialModule { }
