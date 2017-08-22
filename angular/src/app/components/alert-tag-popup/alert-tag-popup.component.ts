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
    private router: Router
  ) { }

  tags: [any];
  tagObjects = [];
  tagRelated = [];
  ngOnInit() {
    this.tags = this.data;
    for(let i = 0; i < this.tags.length; i++)
    {
      this.tagObjects.push(this.GetAlertTypeObject(this.tags[i].alertType));
      this.tagRelated.push({});
      this.GetPeopleInfo(this.tags[i].peopleId, i);
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
}
