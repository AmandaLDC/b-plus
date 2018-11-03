import { Component, OnInit } from '@angular/core';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  id : string;
  results : any;

  constructor(private _searchService: SearchService) { }

  ngOnInit() {
    this.id = this._searchService.getdataforid_material();
    this.id
    .subscribe(this.id => this._searchService.search(this.id)
    .subscribe(response => this.results = response))
  }

}
