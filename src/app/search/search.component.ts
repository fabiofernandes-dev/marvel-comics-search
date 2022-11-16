import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, throwError, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retryWhen, retry } from "rxjs/operators";
import {SearchService} from "../search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public loading: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page:any;
  public favs:number[]=[];

  constructor(private searchService: SearchService) { }

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search(){
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return this.searchService.searchCharacters(term)
      }),
      catchError((e) => {
        //handle the error and return it
        console.log(e)
        this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      }),
    ).subscribe(v => {
        this.loading = false;
        this.searchResults = v;
        this.searchResults = this.searchResults.sort((a,b)=> this.sortByFav(a,b));
        this.paginationElements = this.searchResults;

    })
  }

  ngOnInit() {
    this.search();
  }

  public toogleFav(id){
    console.log(id);
    var index = this.favs.indexOf(id);

    if (index == -1) {
      if(this.favs.length==5){
        alert('Só é possivel marcar até 5 personagens como favorito.')
        return;
      }
      this.favs.push(id);
    } else {
      do {
        this.favs.splice(index, 1);
        index = this.favs.indexOf(id);
      } while (index != -1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favs));
  }

  public isMyFav(id):boolean {
    console.log(id);
    var favs = JSON.parse(localStorage.getItem('favorites'))
    if(favs!=null){
      var index = favs.indexOf(id);

      if (index > -1) {
        return true;
      }
    }
    return false;
  }

  public sortByFav(a,b){
    if(this.isMyFav(a.id))
      return -1;
    else if(this.isMyFav(b.id))
      return 1;
    else
      return a - b;
  }
}
