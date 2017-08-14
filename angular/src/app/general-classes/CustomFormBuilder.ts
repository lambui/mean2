import { FormBuilder, Validators } from '@angular/forms';

export abstract class CustomFormBuilder
{
    form: any;
    constructor(protected formBuilder: FormBuilder) {}
    abstract InitForm(): void;

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