import { AlertTagService } from '../../services/alert-tag/alert-tag.service';
import { PeopleDetailService } from '../../services/people-detail/people-detail.service';
import { PeopleService } from '../../services/people/people.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AlertTypeObject, AlertTypeFunctions} from '../../general-classes/AlertTagTypes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alert-tag-popup',
  templateUrl: './alert-tag-popup.component.html',
  styleUrls: ['./alert-tag-popup.component.css']
})
export class AlertTagPopupComponent implements OnInit {

  constructor(
    private dialog: MdDialog,
    private dialogRef: MdDialogRef<AlertTagPopupComponent>,
    @Inject(MD_DIALOG_DATA) private data: any,
    private peopleService: PeopleService,
    private router: Router,
    private alertTagService: AlertTagService,
  ) { }

  tags: [any];
  tagObjects = [];
  tagRelated = [];
  ngOnInit() {
    this.tags = this.data.tags;
    for(let i = 0; i < this.tags.length; i++)
    {
      this.tagObjects.push(this.GetAlertTypeObject(this.tags[i].alertType));
      this.tagRelated.push({});
      this.GetPeopleInfo(this.tags[i].peopleId, i);
      this.InitNewMsg(i);
    }
  }

  CapitalizeFirstLetter(input)
  {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
  
  GetAlertTypeObject(type)
  {
    return AlertTypeFunctions.GetAlertTypeObject(type);
  }

  GetPeopleInfo(peopleId: string, index: number)
  {
    this.peopleService.GetPeople(peopleId)
                      .subscribe(res => this.tagRelated[index].people = res);
  }

  InitNewMsg(index: number)
  {
    this.tagRelated[index].newMsg = "";
    this.tagRelated[index].editMsg = "";
  }

  DisplayPeopleInfo(people: any)
  {
    return people.lastName + ", " + people.firstName + 
          ". DOB: " + people.DOB.year + "-" + people.DOB.month + "-" + people.DOB.date;
  }

  GoToPeoplePage(peopleId: string)
  {
    this.router.navigate(['./people/' + peopleId + '/detail']);
    this.dialogRef.close();
  }

  GoToDetailPage(peopleId: string, detailId: string)
  {
    this.router.navigate(['./people/' + peopleId + '/detail/' + detailId]);
    this.dialogRef.close();
  }

  GoToAlertTagHome(tag: any)
  {
    let path = './people/' + tag.peopleId + '/detail/' + tag.detailId;
    this.router.navigate([path], {queryParams: {alertTagIds: tag._id + ';'}});
    this.dialogRef.close();
  }

  RemoveTagAt(index: number)
  {
    if(index < 0 || index >= this.tags.length)
      return;
    this.tags.splice(index, 1);
    this.tagObjects.splice(index, 1);
    this.tagRelated.splice(index, 1);
  }

  ResolveTag(tagId: string, index: number)
  {
    this.alertTagService.RemoveAlertTags(tagId)
                        .subscribe(res => {
                          this.RemoveTagAt(index);
                          this.data.parent.RemoveTagId(tagId);
                          if(this.tags.length <= 0)
                            this.dialogRef.close();
                        });
  }

  toggleForm: boolean = false;
  ToggleForm()
  {
    this.toggleForm = !this.toggleForm;
  }

  AppendMessage(tag: any, tagIndex: number)
  {
    this.alertTagService.AppendMessage(tag._id, this.tagRelated[tagIndex].newMsg)
                        .subscribe(res => {
                          tag.msg = res.msg;
                          this.tagRelated[tagIndex].newMsg = "";
                          this.toggleForm = false;
                        });
  }

  RemoveMessage(tag: any, msgIndex: number)
  {
    this.alertTagService.RemoveMessage(tag._id, msgIndex)
                        .subscribe(res => {
                          tag.msg = res.msg;
                        });
  }

  toggleEdit: number = -1;
  ToggleEdit(messageIndex: number, tagIndex: number, message: string)
  {
    if(this.toggleEdit == messageIndex)
      this.toggleEdit = -1
    else
    {
      this.toggleEdit = messageIndex;
      this.tagRelated[tagIndex].editMsg = message;
    }
  }

  EditMessage(tag: any, msgIndex: number, tagIndex: number)
  {
    this.alertTagService.EditMessage(tag._id, msgIndex, this.tagRelated[tagIndex].editMsg)
                        .subscribe(res => {
                          tag.msg = res.msg;
                          this.tagRelated[tagIndex].editMsg = "";
                          this.toggleEdit = -1;
                        });
  }
}
