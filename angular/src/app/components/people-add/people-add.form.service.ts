import { Injectable } from '@angular/core';
import { CustomFormBuilder } from '../../general-classes/CustomFormBuilder';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class PeopleAddFormService extends CustomFormBuilder {
    constructor(protected formBuilder: FormBuilder)
    {
        super(formBuilder);
    }

    InitForm(): void
    {
        let date = new Date();
        let todayDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        this.form = this.formBuilder.group({
            'firstName': ['', [Validators.required]],
            'lastName': ['', [Validators.required]],
            'DOB': [todayDate, [Validators.required]]
        });
    }

    GetValueOfField(fieldName: string): any
    {
      return super.GetValueOfField(fieldName);
    }
  
    SetValueOfField(fieldName: string, value: any): any
    {
      super.SetValueOfField(fieldName, value);
    }

    ClearForm()
    {
        super.ClearForm();
        this.SetValueOfField('DOB', this.GetTodayDateString());
    }

    GetTodayDateString()
    {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    }
}