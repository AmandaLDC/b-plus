import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  user: any = {};
  model: any = {};

  constructor(
      private http: HttpClient,
      private router: Router,
      private _userService: UserService) {}

  ngOnInit() {
  }

  onSubmit() {
      const id = this.model.id;
      this._userService.save(id);
      const endpoint = this._userService.getdataforid_aluno();
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
      this.http.get(endpoint, options).subscribe(dados => {
        this.user = dados[0];
        const  pw = this.user.cpf.split('.');
        let senha = [];
        senha = pw[0] + pw[1];
        if (senha === this.model.password) {
          this.router.navigate(['/home-page']);
        }
      });
  }

}
