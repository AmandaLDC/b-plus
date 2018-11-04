import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  id : any;
  results : any;

  constructor(private _searchService: SearchService, private _http: HttpClient) { }

  ngOnInit() {
    const options = {
      Headers: new HttpHeaders().append('content-type', 'application/json').append("Access-Control-Allow-Methods", "GET"),
      withCredentials: false
    }
    this.id = this._searchService.getdataforid_material();
    console.log(this.id);
    this._http.get(this.id, options).subscribe(response => console.log(response));
  }

}
