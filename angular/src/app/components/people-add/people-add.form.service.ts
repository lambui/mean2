import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class PeopleAddFormService {
    constructor(private formBuilder: FormBuilder) { }

    form: any;
    InitForm()
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
        return this.form.controls[fieldName].value;
    }

    SetValueOfField(fieldName: string, value: any): any
    {
        this.form.controls[fieldName].setValue(value);
    }

    ClearForm()
    {
        this.form.reset();
        this.SetValueOfField('DOB', this.GetTodayDateString());
    }

    GetTodayDateString()
    {
        let date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    }
}