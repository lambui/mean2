import { Component, OnInit, Input } from '@angular/core';
import { AlertTypeFunctions, AlertTypeObject } from '../../general-classes/AlertTagTypes';
import { MdDialog } from '@angular/material';
import { AlertTagPopupComponent } from '../alert-tag-popup/alert-tag-popup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alert-tag-list',
  templateUrl: './alert-tag-list.component.html',
  styleUrls: ['./alert-tag-list.component.css']
})
export class AlertTagListComponent implements OnInit {
  @Input() tagList: any[];
  @Input() mode: number = 0; //mode 0: normal, 1: type collapse
  constructor(
    private dialog: MdDialog,
    private route: ActivatedRoute
  ) { }

  alertTypes: string[];
  ngOnInit() {
    this.alertTypes = AlertTypeObject.Type;
    if(this.mode == 1)
      this.TypeCollapse();

    this.route.queryParams.subscribe(params => {
      if(params['alertTagIds']) //in case of having alertTagIds params
      {
        let ids = params['alertTagIds'].split(';');
        let list = this.FetchTags(ids);
        this.ViewTagsComposite(list);
      }
    });
  }

  //use this when manually alter tagList
  Refresh()
  {
    for(let i = 0; i < this.tagList.length; i++)
    {
      (<any>this.tagList[i]).count = null;
    }
    if(this.mode == 1)
      this.TypeCollapse();
  }

  FetchTags(ids: string[])
  {
    let tempList = this.tagList.slice();
    let finalList = [];
    for(let i = 0; i < ids.length; i++)
    {
      for(let j = 0; j < tempList.length; j++)
      {
        if(ids[i] === tempList[j]._id)
        {
          finalList.push(tempList[j]);
          tempList.splice(j, 1);
        }
      }
    }
    return finalList;
  }

  GetAlertTypeIcon(type)
  {
    return AlertTypeFunctions.GetAlertTypeIcon(type);
  }

  GetAlertTypeColor(type)
  {
    return AlertTypeFunctions.GetAlertTypeColor(type);
  }

  GetAlertTypeChipStyles(type)
  {
    let index = AlertTypeFunctions.GetAlertTypeIndex(type);
    return AlertTypeObject.ChipStyle[index];
  }

  RemoveTagId(tagId: string)
  {
    for(let i = 0; i < this.tagList.length; i++)
    {
      if(this.tagList[i]._id === tagId)
      {
        this.tagList.splice(i, 1);
        this.Refresh();
        return;
      }
    }
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
      return '40%';
    if(winWidth > 600)
      return '70%';
    else
      return '80%';
  }

  ViewTags(tag: any, index: number)
  {
    //fetch tags to display
    let tags = [];
    if(tag.count)
    {
      let i = index;
      let count = 0;
      while(count < tag.count)
      {
        if(i + count >= this.tagList.length)
          return [];
        tags.push(this.tagList[i + count]);
        count++;
      }
    }
    else
    {
      tags.push(tag);
    }

    if(tags.length <= 0 || tags == null)
      return;

    //create modal
    let data = {
      parent: this,
      tags: tags
    };
    let dialogRef = this.dialog.open(AlertTagPopupComponent, {
      panelClass: 'alert-tag-popup',
      data: data,
      width: this.DetermineDialogWidth(),
      position: {
        top: '50px'
      }
    });
  }

  ViewTagsComposite(tags: any)
  {
    if(tags.length <= 0 || tags == null)
      return;
    //create modalss
    let data = {
      parent: this,
      tags: tags
    };
    let dialogRef = this.dialog.open(AlertTagPopupComponent, {
      panelClass: 'alert-tag-popup',
      data: data,
      width: this.DetermineDialogWidth(),
      position: {
        top: '50px'
      }
    });
  }
}
