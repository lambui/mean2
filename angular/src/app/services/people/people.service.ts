import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const backend = 'http://localhost:3000';

@Injectable()
export class PeopleService {

  constructor(private http: HttpClient) { }

  GetAllPeople()
  {
    let url = backend + '/first/all';
    return this.http.get(url);
  }

  AddPeople(person: any) //does not send POST request until subscibe is called to return value
  {
    let url = backend + '/first/add';
    return this.http.post(url, person);
  }

  DeletePeople(personId: any)
  {
    let url = backend + '/first/delete?_id=' + personId;
    return this.http.delete(url);
  }
}