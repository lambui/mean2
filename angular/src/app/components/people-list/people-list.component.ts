import { PeopleDetailService } from '../../services/people-detail/people-detail.service';
import { PeopleService } from '../../services/people/people.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

class People{
  firstName: string;
  lastName: string;
  DOB: {
    year: string;
    month: string;
    date: string;
  };
  constructor(firstName, lastName, DOB)
  {
    this.firstName = firstName;
    this.lastName = lastName; 
    this.DOB = DOB;
  }
};

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  @Input() peopleList: People[];
  @Output() deletePeopleRespond: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private peopleService: PeopleService,
    private peopleDetailService: PeopleDetailService
  ) { }

  ngOnInit() {
  }

  ViewDetail(id:string)
  {
    this.router.navigate(['./people/' + id + '/detail']);
  }

  DeletePeople(id: any, index: number) //start cleaning up dependent records before removing the to-be-removed record
  {
    this.peopleDetailService.RemoveDetailList(id)
                            .subscribe(() => this.RemovePeople(id, index),
                                        err => this.ErrorHandler(err));
  }

  RemovePeople(id: any, index: number) //remove the actual record in People collection
  {
    this.peopleService.DeletePeople(id)
                      .subscribe(() => this.deletePeopleRespond.emit({success: true, index: index}),
                                  err => this.ErrorHandler(err));
  }

  ErrorHandler(err: any)
  {
    return this.deletePeopleRespond.emit({success: false, msg: err});
  }
}
