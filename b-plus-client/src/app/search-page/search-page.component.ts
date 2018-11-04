import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  url : string = "http://dev2.unifacef.com.br:8000/api/exemplar"
  results : any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.url).subscribe(data => {
      this.results = data;
    });
  }

}
