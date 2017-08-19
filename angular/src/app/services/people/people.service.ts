import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/map";

//const backend = 'http://localhost:3000/people';
const graphql = 'http://localhost:3000/graphql';

@Injectable()
export class PeopleService {

  constructor(
    private http: HttpClient
  ) { }

  GetPeople(id)
  {
    //let url = backend + '/specific/' + id;
    let queryField = 'people_find_by_id';
    let queryString: string = `
    {
      ${queryField}(_id: "${id}")
      {
        _id,
        firstName,
        lastName,
        DOB{
          year, month, date
        }
      }
    }
    `
    let url = graphql + '?query=' + queryString;
    return this.http.get(url)
                    .map((res: any) => res.data[queryField]);
  }

  GetAllPeople()
  {
    //let url = backend + '/all';
    let queryField = 'people';
    let queryString: string = `
    {
      ${queryField}{
        _id,
        firstName,
        lastName
      }
    }
    `;
    let url = graphql + '?query=' + queryString;
    return this.http.get(url)
                    .mergeMap((res: any) => res.data[queryField])
                    .toArray();
  }

  AddPeople(person: any) //does not send POST request until subscibe is called to return value
  {
    //let url = backend + '/add';
    let url = graphql;
    let mutationField = 'people_add_object';
    let mutationString = `
    mutation{
      ${mutationField}(newPeople: {
        firstName: "${person.firstName}",
        lastName: "${person.lastName}",
        DOB: {
          year: "${person.DOB.year}",
          month: "${person.DOB.month}", 
          date: "${person.DOB.date}"
        }
      })
      {
        _id,
        firstName,
        lastName
      }
    }
    `;
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }

  DeletePeople(personId: any)
  {
    //let url = backend + '/delete?_id=' + personId;
    let url = graphql;
    let mutationField = 'people_remove';
    let mutationString = `
    mutation{
      ${mutationField}(_id: "${personId}")
      {
        _id
      }
    }
    `;
    let mutationJson = {
      query: mutationString
    };
    return this.http.post(url, mutationJson)
                    .map((res: any) => res.data[mutationField]);
  }
}
