import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  user : any;
  model: any = {};

  constructor(
      private http: HttpClient,
      private router: Router) {}

  ngOnInit() {
    console.log("Page opens");
  }

  getPw(user){
    var cpf = this.user.cpf;
    var pw_aux = pw.split(".");
    var pw = pw.append(pw_aux[0]);
    pw = pw.append(pw_aux[1]);
    pw = pw.join();
    console.log(pw);
  }

  onSubmit() {
      var m = JSON.stringify(this.model);
      console.log(this.model);
      var id = JSON.stringify(this.model.id);
      console.log(id);
      this.http.get('http://dev2.unifacef.com.br:8000/api/matriculadoGrad/'+id).subscribe(dados => {
        this.user = dados;
      })
      console.log(this.user);
      var pw = this.getPw(this.user);
      if(pw==this.model.password){
        this.router.navigate(['/home-page']);
      }
  }

}
