import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
      const id = this.model.id;
      const endpoint = 'http://dev2.unifacef.com.br:8000/api/matriculadoGrad/' + id;
      this.http.get(endpoint).subscribe(dados => {
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
