import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-page',
  templateUrl: './recommended-page.component.html',
  styleUrls: ['./recommended-page.component.css']
})
export class RecommendedPageComponent implements OnInit {


    lista: any;
    user: any = JSON.parse(localStorage.getItem('user'));
    options: any = {
                      Headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
                        'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token, content-type'
                      }),
                      withCredentials: false
                    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private _apiService: ApiService) {}

    ngOnInit() {
      if (this.user == null) {
        this.router.navigate(['/home-page']);
      } else {
        const endpoint = this._apiService.allLists();
        this.http.get(endpoint, this.options).subscribe(data => {
          this.pageInit(data);
        });
      }
    }

    pageInit(data) {
      this.lista = data;
    }

    expandList(i) {
      localStorage.setItem('list', JSON.stringify(this.lista[i]));
      this.router.navigate(['/expand-list']);
    }


}
