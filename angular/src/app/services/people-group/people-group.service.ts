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

  protected BuildValue(value: any): string
  {
    if(typeof value === 'string')
      return `"${value}"`;
    if(isNaN(value) == false)
      return `${value}`;
    if(typeof value === 'object' && value.constructor !== Array)
    {
      let returnVal = ``;
      returnVal += `{`;
      for (var key in value) 
      {
        if (value.hasOwnProperty(key)) 
        {
          returnVal += `${key}: `;
          returnVal += this.BuildValue(value[key]);
          returnVal += `, `;
        }
      }
      returnVal = returnVal.substr(0, returnVal.length-2);
      returnVal += `}`;
      return returnVal;
    }
    if(value.constructor === Array)
    {
      let returnVal = `[`;
      for(let i = 0; i < value.length; i++)
      {
        returnVal += this.BuildValue(value[i]);
        if(i != value.length-1)
          returnVal += ', ';
      }
      returnVal += `]`;
      return returnVal;
    }
    return ``;
  }

  protected BuildArguments(args: any[]): string
  {
    if(args == [] || args == null)
      return "";
    let argument = `(`;
    for(let i = 0; i < args.length; i++)
    {
      argument += `${args[i].name}:`;
      argument += this.BuildValue(args[i].value);
      if(i != args.length-1)
        argument += `, `;
    }
    argument += `)`;
    return argument;
  }

  protected BuildQuery(query: string, args: any[], requestInfo: string)
  {
    let queryField = query;
    let queryString = `{${queryField}`;
    let queryArguments = this.BuildArguments(args);
    queryString += queryArguments;
    queryString += requestInfo;
    queryString += `}`;
    let url = graphql + '?query=' + queryString;
    return url;
  }

  QueryList(query: string, args: any[], requestInfo: string)
  {
    let url = this.BuildQuery(query, args, requestInfo);
    return this.http.get(url)
                    .mergeMap((res: any) => res.data[query])
                    .toArray();
  }

  QueryObject(query: string, args: any[], requestInfo: string)
  {
    let url = this.BuildQuery(query, args, requestInfo);
    return this.http.get(url)
                    .map((res: any) => res.data[query]);
  }
    
  GetAllGroups(requestInfo: string)
  {
    let queryField = "people_group_all";
    let queryString = `{${queryField}`
    let queryRequest = `{`;
    queryRequest += requestInfo;
    queryRequest += `}`;
    queryString += queryRequest;
    queryString += `}`;

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

  RemoveGroup(name: string)
  {
    let mutationField = 'people_group_delete';
    let mutationString = `
    mutation{
      ${mutationField}(name: "${name}"){
        name
        desc
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
