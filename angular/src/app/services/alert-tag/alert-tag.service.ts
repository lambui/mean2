import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const backend = 'http://localhost:3000/people/detail';

@Injectable()
export class AlertTagService {

  constructor(
    private http: HttpClient
  ) { }

  GetAlertTagsOfDetail(peopleId: string, detailId: string)
  {
    let url = backend + '/' + peopleId + '/' + detailId + '/alerttags';
    return this.http.get(url);
  }

  GetAlertTagsBelongToPerson(peopleId: string)
  {
    let url = backend + '/' + peopleId + '/alerttags';
    return this.http.get(url); 
  }

  AddAlertTagsToDetail(peopleId: string, detailId: string, alertJson: any)
  {
    let url = backend + '/' + peopleId + '/' + detailId + '/alerttags/add';
    return this.http.post(url, alertJson);
  }
}
