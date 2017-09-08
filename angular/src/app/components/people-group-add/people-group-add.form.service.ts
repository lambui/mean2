import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleGroupAddFormService 
{
    constructor(
        protected formBuilder: FormBuilder
    ) { }

    form: FormGroup;
    InitForm(): any
    {
        this.form = this.formBuilder.group({
            group: ['', [Validators.required]],
            msg: []
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
    }
}