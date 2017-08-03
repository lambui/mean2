import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FrontPageFormService {
    constructor(private formBuilder: FormBuilder) { }

    form: any;
    InitForm()
    {
        this.form = this.formBuilder.group({
            'firstName': ['', [Validators.required]],
            'lastName': ['', [Validators.required]],
            'DOB': ['', [Validators.required]]
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