import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

const backend = 'http://localhost:3000/people';

@Injectable()
export class PeopleService {

  constructor(
    private http: HttpClient
  ) { }

  GetPeople(id)
  {
    let url = backend + '/specific/' + id;
    return this.http.get(url);
  }

  GetAllPeople()
  {
    let url = backend + '/all';
    return this.http.get(url);
  }

  AddPeople(person: any) //does not send POST request until subscibe is called to return value
  {
    let url = backend + '/add';
    return this.http.post(url, person);
  }

  DeletePeople(personId: any)
  {
    let url = backend + '/delete?_id=' + personId;
    return this.http.delete(url);
  }
}
