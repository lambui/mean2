import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/map";

export class graphqlRequest {
    readonly graphql: string = "http://localhost:3000/graphql";
    private name: string;
    private isMutation: boolean;
    private isList: boolean;
    private args: any[];
    private requestFields: string[];
    private http: HttpClient;
    
    requestInfo: string = '';
    argString: string = '';
    built: any;
    constructor(nameInput: string, httpInput: HttpClient)
    {
        this.http = httpInput;
        this.name = nameInput;
        this.args = [];
        this.requestFields = [];
        this.isMutation = false;
        this.isList = false;
    }

    AppendArg(arg: {name: string, value: any})
    {
        this.args.push(arg);
        return this;
    }

    AppendField(requestField: string)
    {
        this.requestFields.push(requestField);
        return this;
    }
    
    private CompileRequestInfo()
    {
        let returnValue = '{ ';
        for(let i = 0; i < this.requestFields.length; i++)
        {
            returnValue += this.requestFields[i];
            if(i != this.requestFields.length-1)
                returnValue += ", ";
        }
        returnValue += ' }';
        return returnValue;
    }

    RemoveArg(index: number)
    {
        this.args.splice(index, 1);
        return this;
    }

    RemoveRequestField(index: number)
    {
        this.requestFields.splice(index, 1);
        return this;
    }

    private BuildValue(value: any): string
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
  
    private BuildArguments(args: any[]): string
    {
      if(args.length == 0 || args == null)
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

    private BuildQuery()
    {
      let queryField = this.name;
      let queryString = `{${queryField}`;
      let queryArguments = this.argString;
      queryString += queryArguments;
      queryString += this.requestInfo;
      queryString += `}`;
      let url = this.graphql + '?query=' + queryString;
      return url;
    }
  
    private BuildMutation()
    {
      let mutationField = this.name;
      let mutationString = `mutation{${mutationField}`;
      let mutationArguments = this.argString;
      mutationString += mutationArguments;
      mutationString += this.requestInfo;
      mutationString += `}`;
      console.log(mutationString);
      let mutationJson = {
        query: mutationString
      };
      return mutationJson;
    }

    IsMutation(input: boolean)
    {
        if(this.isMutation == input)
            return this;
        else
            this.isMutation = input;
        if(this.built)
            return this.Build();
        else
            return this;
    }

    IsList(input: boolean)
    {
        this.isList = input;
        return this;
    }

    private requestInfoManual: boolean = false;
    SetRequestInfo(input: string)
    {
        this.requestInfoManual = true;
        this.requestInfo = input;
        return this;
    }

    //for nested request fields, this should go after all the AppendField in the chain
    //any AppendField chained after this will be useless
    AppendRequestInfo(input: string)
    {
        this.requestInfoManual = true;
        this.requestInfo = this.CompileRequestInfo();
        this.requestInfo = this.requestInfo.substr(0, this.requestInfo.length-2) + ", " + input + " }";
        return this;
    }

    //chain this after any AppendRequestInfo will nullify their effect
    UnsetRequestInfo()
    {
        this.requestInfoManual = false;
        return this;
    }

    Build()
    {
        if(this.requestInfoManual == false)
            this.requestInfo = this.CompileRequestInfo();
        this.argString = this.BuildArguments(this.args);
        if(this.isMutation)
            this.built = this.BuildMutation();
        else
            this.built = this.BuildQuery();
        return this;
    }

    PrintBuild()
    {
        console.log(this.built);
        return this;
    }

    Run()
    {
        if(this.built == null)
            return this.Build().Run();
        if(this.isMutation)
        {
            if(this.isList == false)
                return this.http.post(this.graphql, this.built)
                                .map((res: any) => res.data[this.name]);
            else
                return this.http.post(this.graphql, this.built)
                                .mergeMap((res: any) => res.data[this.name])
                                .toArray();
        }
        else
        {
            if(this.isList == false)
                return this.http.get(this.built)
                                .map((res: any) => res.data[this.name]);
            else
                return this.http.get(this.built)
                                .mergeMap((res: any) => res.data[this.name])
                                .toArray();                    
        }
    }
}