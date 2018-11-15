import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  url : string = "http://dev2.unifacef.com.br:8000/api/exemplar"
  results : any;

  constructor(private http: HttpClient, public router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.results = data;
    });
  }
  

  onClick(str : string){
    this._searchService.save(str);
    this.router.navigate(['/book-info']);
  }

}
