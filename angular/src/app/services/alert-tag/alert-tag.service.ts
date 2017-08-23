import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/map";

const backend = 'http://localhost:3000/people/detail';
const graphql = 'http://localhost:3000/graphql';

@Injectable()
export class AlertTagService {

  constructor(
    private http: HttpClient
  ) { }

  GetAlertTagsOfDetail(peopleId: string, detailId: string)
  {
    //let url = backend + '/' + peopleId + '/' + detailId + '/alerttags';
    let url = graphql + '?query=';
    let queryField = 'detail_alert_tag';
    let queryString = `
    {
      ${queryField}(peopleId: "${peopleId}", detailId: "${detailId}")
      {
        _id
        peopleId
        detailId
        alertType
        msg
        date_create_at
      }
    }
    `
    url += queryString;
    return this.http.get(url)
                    .mergeMap((res: any) => res.data[queryField])
                    .toArray();
  }

  GetAlertTagsBelongToPerson(peopleId: string)
  {
    //let url = backend + '/' + peopleId + '/alerttags';
    let url = graphql + '?query=';
    let queryField = 'people_alert_tag';
    let queryString = `
    {
      ${queryField}(peopleId: "${peopleId}")
      {
        _id
        peopleId
        detailId
        msg
        alertType
        date_create_at
      }
    }`
    url += queryString;
    return this.http.get(url)
                    .mergeMap((res: any) => res.data[queryField])
                    .toArray(); 
  }

  AddAlertTagsToDetail(peopleId: string, detailId: string, alertJson: any)
  {
    //let url = backend + '/' + peopleId + '/' + detailId + '/alerttags/add';
    let url = graphql;
    let mutationField = 'alert_tag_add';
    let mutationString = `
    mutation{
      ${mutationField}(
        peopleId: "${peopleId}",
        detailId: "${detailId}",
        alertType: "${alertJson.alertType}",
        msg: "${alertJson.msg}"
      ){
        _id,
        alertType,
        msg,
        date_create_at
      }
    }`;
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }

  RemoveAlertTags(_id: string)
  {
    let url = graphql;
    let mutationField = 'alert_tag_remove_by_id';
    let mutationString = `
    mutation{
      ${mutationField}(_id:"${_id}")
      {
        _id
      }
    }`;
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }
}
