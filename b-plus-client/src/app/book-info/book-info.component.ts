import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  results : any;

  constructor(
    private _searchService: SearchService,
    private http: HttpClient) { }

  ngOnInit() {
    const endpoint = this._searchService.getdataforid_material();
    console.log(endpoint);
    const options = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : '*',
        "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
      }),
      withCredentials: false
    }
    this.http.get(endpoint, options).subscribe(data => {
      this.results = data[0];
    });
  }


}
