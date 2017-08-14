import { Injectable } from '@angular/core';
import { CustomFormBuilder } from '../../general-classes/CustomFormBuilder';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class AlertTagBannerFormService extends CustomFormBuilder {
  constructor(protected formBuilder: FormBuilder) 
  {
    super(formBuilder);
  }

  InitForm(): void
  {
    this.form = this.formBuilder.group({
      'alertType': ['', [Validators.required]],
      'msg': ['']
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
  }
}
