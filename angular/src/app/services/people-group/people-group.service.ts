import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/map";

const graphql = 'http://localhost:3000/graphql';

@Injectable()
export class PeopleGroupService {

  constructor(
    private http: HttpClient
  ) { }

  GetAllGroups()
  {
    let queryField = "people_group_all";
    let queryString = `
    {
      ${queryField}{
        name
        desc
      }
    }`
    let url = graphql + '?query=' + queryString;
    return this.http.get(url)
                    .mergeMap((res: any) => res.data[queryField])
                    .toArray();
  }

  CreateGroup(name: string, desc: string)
  {
    let mutationField = 'people_group_create';
    let mutationString = `
    mutation{
      ${mutationField}(name: "${name}"
    `;
    if(desc != '')
      mutationString += `, desc: "${desc}"`;
    mutationString += `){
        name
        desc
        _id
      }
    }`;
    let mutationJson = {
      query: mutationString
    };
    let url = graphql;
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }
}
