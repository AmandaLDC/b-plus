import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search/search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(public router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .distinctUntilChanged()
    .subscribe(queryField => this._searchService.search(queryField)
    .subscribe(response => this.results = response.json().titulo_material));
  }

}
