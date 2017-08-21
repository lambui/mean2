import { Component, OnInit, Input } from '@angular/core';
import { AlertTypes } from '../../general-classes/AlertTagTypes';
import { MdDialog } from '@angular/material';
import { AlertTagPopupComponent } from '../alert-tag-popup/alert-tag-popup.component';

@Component({
  selector: 'app-alert-tag-list',
  templateUrl: './alert-tag-list.component.html',
  styleUrls: ['./alert-tag-list.component.css']
})
export class AlertTagListComponent implements OnInit {
  @Input() tagList: { alertType }[];
  @Input() mode: number = 0; //mode 0: normal, 1: type collapse
  constructor(
    private dialog: MdDialog
  ) { }

  alertTypes: string[];
  ngOnInit() {
    this.alertTypes = AlertTypes;
    if(this.mode == 1)
      this.TypeCollapse();
  }

  TypeCollapse()
  {
    if(!this.tagList)
      return;

    let tagListDic = {};
    for(let i = 0; i < this.tagList.length; i++)
    {
      if(tagListDic[this.tagList[i].alertType] == null)
        tagListDic[this.tagList[i].alertType] = [];
      tagListDic[this.tagList[i].alertType].push(this.tagList[i]);
    }

    let newTagList = [];
    for(let i = 0; i < this.alertTypes.length; i++)
    {
      if(tagListDic[this.alertTypes[i]] == null)
        continue;
      for(let j = 0; j < tagListDic[this.alertTypes[i]].length; j++)
      {
        if(j == 0)
          tagListDic[this.alertTypes[i]][j].count = tagListDic[this.alertTypes[i]].length;
        newTagList.push(tagListDic[this.alertTypes[i]][j]);
      }
    }  

    this.tagList = newTagList;
  }

  CheckTag(tag: any): boolean
  {
    if(this.mode == 0)
      return true;
    if(this.mode == 1 && tag.count)
      return true;

    return false;
  }

  DetermineDialogWidth()
  {
    let winWidth = window.innerWidth;
    if(winWidth > 992)
      return '50%';
    if(winWidth > 600)
      return '70%';
    else
      return '80%';
  }

  ViewSpecificTag(tag: any)
  {
    let tags = [tag];
    let dialogRef = this.dialog.open(AlertTagPopupComponent, {
      data: tags,
      width: this.DetermineDialogWidth(),
      position: {
        top: '50px'
      }
    });
  }
}
