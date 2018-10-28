import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

baseUrl: string = 'http://dev2.unifacef.com.br:8000/api/exemplarTitulo/';

constructor(private _http: Http) { }

search(queryString: string) {
      let _URL = this.baseUrl + queryString;
      return this._http.get(_URL);
  }

}
