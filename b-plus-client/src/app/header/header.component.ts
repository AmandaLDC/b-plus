import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search/search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private _searchService: SearchService) { }
  
  ngOnInit() {
    this.queryField.valueChanges
    .debounceTime(100)
    .distinctUntilChanged()
    .switchMap((query) =>  this._searchService.search(query))
    .subscribe(queryField =>this._searchService.search(queryField))
    .subscribe(response => this.results = this.response.json().items);
  }

}
