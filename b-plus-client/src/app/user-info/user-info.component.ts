import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  results : any;
  user : any;

  constructor(
        private http: HttpClient,
        private router: Router,
        private _searchService: SearchService,
        private _userService: UserService) { }

  ngOnInit() {
    const aluno_endpoint = this._userService.getdataforid_aluno();
    const emprestimo_endpoint = this._userService.getdataforhistorico_aluno();
    const livro_endpoint = this._searchService.getdataforid_material();

    console.log(emprestimo_endpoint);

    const options = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : '*',
        "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
      }),
      withCredentials: false
    }
    this.http.get(aluno_endpoint, options).subscribe(dados => {
      this.user = dados[0];
      this.http.get(emprestimo_endpoint, options).subscribe(data => {
        this.results = data;
      })
    });
  }


}
