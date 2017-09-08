import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/map";
import { graphqlRequest } from "./graphqlRequest";
const graphql = 'http://localhost:3000/graphql';

@Injectable()
export class GraphqlService {

  constructor(private http: HttpClient) { }

  NewGraphQLRequest(name: string)
  {
    return new graphqlRequest(name, this.http);
  }
}
