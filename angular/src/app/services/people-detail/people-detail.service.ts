import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const backend = 'http://localhost:3000/people/detail';

@Injectable()
export class PeopleDetailService {

  constructor(
    private http: HttpClient
  ) { }

  GetDetailList(peopleId)
  {
    let url = backend + "/" + peopleId;
    return this.http.get(url);
  }

  CreateDetailList(peopleId)
  {
    let url = backend + '/create';
    let jsonObj = {peopleId: peopleId};
    return this.http.post(url, jsonObj);
  }

  RemoveDetailList(peopleId)
  {
    let url = backend + '/remove?peopleId=' + peopleId;
    return this.http.delete(url);
  }

  AddDetail(peopleId, detailBody)
  {
    let url = backend + '/add';
    let jsonObj = {
      peopleId: peopleId,
      detailBody: detailBody
    };
    return this.http.post(url, jsonObj);
  }
}
