import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api-endpoints/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  user: any = {};
  model: any = {};
  session: any = JSON.parse(localStorage.getItem('user'));

  constructor(
      private http: HttpClient,
      private router: Router,
      private _apiService: ApiService) {}

  ngOnInit() {
    if (this.session) {
      this.router.navigate(['/home-page']);
    }
  }

  onSubmit() {
      const id = this.model.id;
      const endpoint = this._apiService.getLogin(id);
      console.log(endpoint);

      const options = {
        Headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
          'Access-Control-Allow-Headers' : 'Origin, Content-Type, X-Auth-Token, content-type'
        }),
        withCredentials: false
      };
      this.http.get(endpoint, options).subscribe(data => this.pageInit(data));
  }

  pageInit(data) {
    this.user = data[0];
    localStorage.setItem('user', JSON.stringify(this.user));
    const pw = this.user.cpf.split('.');
    let senha = [];
    senha = pw[0] + pw[1];
    if (senha === this.model.password) {
      this.router.navigate(['/home-page']);
    }
  }

}
