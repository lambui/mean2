import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const backend = 'http://localhost:3000/people/detail';

@Injectable()
export class PeopleDetailService {
  constructor(
    private http: HttpClient
  ) { }

  GetDetailList(peopleId: string)
  {
    let url = backend + "/" + peopleId;
    return this.http.get(url);
  }

  CreateDetailList(peopleId: string)
  {
    let url = backend + '/create';
    let jsonObj = {peopleId: peopleId};
    return this.http.post(url, jsonObj);
  }

  RemoveDetailList(peopleId: string)
  {
    let url = backend + '/destroy?peopleId=' + peopleId;
    return this.http.delete(url);
  }

  AddDetail(peopleId: string, detailBody)
  {
    let url = backend + '/add';
    let jsonObj = {
      peopleId: peopleId,
      detailBody: detailBody
    };
    return this.http.post(url, jsonObj);
  }

  RemoveDetail(peopleId: string, detailId: string)
  {
    let url = backend + '/remove';
    return this.http.put(url, {peopleId: peopleId, detailId: detailId});
  }

  GetDetail(peopleId: string, detailId: string)
  {
    let url = backend + '/' + peopleId + '/specific/' + detailId;
    return this.http.get(url);         
  }
}
