import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class ControlCreateGroupFormService {
    
    form: any;
    constructor(protected formBuilder: FormBuilder) {}

    InitForm(): void
    {
        this.form = this.formBuilder.group({
            'name': ['', [Validators.required]],
            'desc': ['']
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
