import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, observable, of, empty } from 'rxjs';
import { map } from "rxjs/operators";
import { CharactersResponse } from './search/models/character.response';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public baseUrl = "http://localhost:6521/api/marvel";
  public searchResults: any;

  constructor(private httpClient: HttpClient) { }

  public searchCharacters(term): Observable<CharactersResponse[]>{
    if (term === "" ){
      console.log("Not defined");
      return of(null);
      //return empty();
    }else{
      let params = {nameStartsWith: term }
      return this.httpClient.get(this.baseUrl, {params}).pipe(
        map(response => {
          console.log(response)
          return this.searchResults = response as CharactersResponse[];
        })
      );
    }
  }
}
