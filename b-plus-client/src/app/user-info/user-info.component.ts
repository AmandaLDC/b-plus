import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  results : any;
  user : any = JSON.parse(localStorage.getItem("user"));
  options : any = {
                    Headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      "Access-Control-Allow-Origin" : '*',
                      "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
                      "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
                    }),
                    withCredentials: false
                  };

  constructor(
        private http: HttpClient,
        private router: Router,
        private _apiService: ApiService) { }

  ngOnInit() {
    const emprestimo_endpoint = this._apiService.getEmprestimoAluno();

    this.http.get(emprestimo_endpoint, this.options).subscribe(data => {
      this.results = data;
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login-page']);
  }

}
