import { NgModule } from '@angular/core';
import { MdDialogModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule, MdSelectModule } from '@angular/material';

@NgModule({
  imports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
    MdSelectModule, MdDialogModule
  ],
  exports: [ 
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, 
    MdIconModule, MdDatepickerModule, MdInputModule, MdNativeDateModule,
    MdSelectModule, MdDialogModule
  ]
})
export class AngularMaterialModule { }
