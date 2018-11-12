import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { SearchService } from '../search/search.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results: any = [];
  suggestions: any = [];
  queryField: FormControl = new FormControl();

  constructor(public router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .distinctUntilChanged()
    .subscribe(queryField => this._searchService.search(queryField)
    .subscribe(response => this.results = response));
  }

  onClick(str: string) {
    this._searchService.save(str);
    this.results = [];
    this.queryField = new FormControl();
    this.router.navigate(['/book-info']);
  }

}
