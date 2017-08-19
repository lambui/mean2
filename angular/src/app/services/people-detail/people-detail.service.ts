import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

const backend = 'http://localhost:3000/people/detail';
const graphql = 'http://localhost:3000/graphql';

@Injectable()
export class PeopleDetailService {
  constructor(
    private http: HttpClient
  ) { }

  GetDetailList(peopleId: string)
  {
    //let url = backend + "/" + peopleId;
    let url = graphql + '?query=';
    let queryField = 'people_detail';
    let queryString = `
    {
      ${queryField}(peopleId: "${peopleId}"){
        details {
          _id
          create_at
          body
        }
        peopleId
      }
    }`
    url += queryString;
    return this.http.get(url)
                    .map((res: any) => res.data[queryField]);
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
    //let url = backend + '/' + peopleId + '/' + detailId;
    let url = graphql + '?query=';
    let queryField = 'specific_detail';
    let queryString = `
    {
      ${queryField}(peopleId: "${peopleId}", detailId:"${detailId}"){
        peopleId
        details{
          _id
          create_at
          body
        }
      }
    }
    `;
    url += queryString;
    return this.http.get(url)
                    .map((res: any) => res.data[queryField]);         
  }
}