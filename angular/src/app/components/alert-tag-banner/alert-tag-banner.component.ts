import { AlertTagService } from '../../services/alert-tag/alert-tag.service';
import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AlertTagBannerFormService } from './alert-tag-banner.form.service';
import { AlertTypeObject } from '../../general-classes/AlertTagTypes';

@Component({
  selector: 'app-alert-tag-banner',
  templateUrl: './alert-tag-banner.component.html',
  styleUrls: ['./alert-tag-banner.component.css'],
  providers: [ AlertTagBannerFormService ]
})
export class AlertTagBannerComponent implements OnInit, DoCheck {
  @Input() people: any;
  @Input() detail: any;
  alertTags: any;
  init: boolean = false;

  constructor(
    private alertTagService: AlertTagService,
    private compFormService: AlertTagBannerFormService
  ) { }

  alertTypes: string[];
  ngOnInit() {
    this.compFormService.InitForm();
    this.alertTypes = AlertTypeObject.Type;
  }

  ngDoCheck()
  {
    if(this.people && this.detail && this.init == false)
    {
      this.Init();
      this.init = true;
    }
  }

  Init()
  {
    if(this.people == null || this.detail == null)
    {
      console.log(this.people + " " + this.detail);
      return;
    }
    this.FetchAlertTags();
  }

  showForm: boolean = false;
  ShowForm()
  {
    this.showForm = true;
  }
  HideForm()
  {
    this.showForm = false;
  }

  FetchAlertTags()
  {
    this.alertTagService.GetAlertTagsOfDetail(this.people._id, this.detail._id)
                        .subscribe(tags => this.alertTags = tags);
  }

  AddAlertTag()
  {
    let msg = this.compFormService.GetValueOfField('msg');
    let alertJson = 
    {
      alertType: this.compFormService.GetValueOfField('alertType'),
      msg: msg
    }
    this.alertTagService.AddAlertTagsToDetail(this.people._id, this.detail._id, alertJson)
                        .subscribe(newAlert => this.FetchAlertTags());
  }
}
