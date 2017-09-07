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
          index
        }
        peopleId
      }
    }`
    url += queryString;
    return this.http.get(url)
                    .map((res: any) => res.data[queryField]);
  }

  /*
  CreateDetailList(peopleId: string)
  {
    let url = backend + '/create';
    let jsonObj = {peopleId: peopleId};
    return this.http.post(url, jsonObj);
  }
  */

  RemoveDetailList(peopleId: string)
  {
    //let url = backend + '/destroy?peopleId=' + peopleId;
    let url = graphql;
    let mutationField = 'people_detail_remove';
    let mutationString = `
      mutation{
        ${mutationField}(peopleId: "${peopleId}")
        {
          _id
        }
      }
    `
    let mutationJson = {
      query: mutationString
    }
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }

  AddDetail(peopleId: string, detailBody)
  {
    /*
    let url = backend + '/add';
    let jsonObj = {
      peopleId: peopleId,
      detailBody: detailBody
    };
    */

    let url = graphql;
    let mutationField = 'detail_add';
    let mutationString = `
      mutation{
        ${mutationField}(peopleId: "${peopleId}", detailBody: "${detailBody}")
        {
          _id
          peopleId
          details{
            create_at
            body
            _id
          }
        }
      }
    `
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }

  RemoveDetail(peopleId: string, detailId: string)
  {
    //let url = backend + '/remove';
    let url = graphql;
    let mutationField = 'detail_remove';
    let mutationString = `
      mutation{
        ${mutationField}(peopleId: "${peopleId}", detailId: "${detailId}"){
          _id
        }
      }
    `
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
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
          index
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