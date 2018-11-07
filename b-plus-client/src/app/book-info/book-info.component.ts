import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  results: any = {
                  titulo : "",
                  tipo : "",
                  autor : [],
                  volume : 0,
                  edicao : 0,
                  ano : "",
                  editora : "",
                  assuntos : [],
                  n_disponivel : 0,
                  n_total : 0
                };

    options : any = {
                      Headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin" : '*',
                        "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
                        "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
                      }),
                      withCredentials: false
                    }

  constructor(
    private _searchService: SearchService,
    private http: HttpClient) { }

  ngOnInit() {
    const livro_endpoint = this._searchService.getdataforid_material();

    if(livro_endpoint != "0"){
      const options = {
        Headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin" : '*',
          "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
          "Access-Control-Allow-Headers" : 'Origin, Content-Type, X-Auth-Token, content-type'
        }),
        withCredentials: false
      }
      this.http.get(livro_endpoint, options).subscribe(data => {
        this.pageInit(data);
      })
    } else {
      JSON.parse(localStorage.getItem("book"));
    }
  }

  pageInit(data){
    let autor_endpoint = this._searchService.getdataforautor();
    let assunto_endpoint = this._searchService.getdataforassunto();
    let ex = data[0].id_exemplar;
    autor_endpoint = autor_endpoint + ex;
    assunto_endpoint = assunto_endpoint + ex;

    let t = data[0].titulo_material;
    let tipo = data[0].nome_tipo;
    let ne = data[0].edicao_exemplar;
    let ano = data[0].edicao_ano;
    let ed = data[0].nome_editora;
    let nd = this.getnd(data);
    let nt = this.getnt(data);
    let v;
    if(data[0].volume_exemplar == "0"){
      v = "Único";
    } else {
      v = data[0].volume_exemplar;
    }
    let autor;
    let assuntos = [];


    this.results = {
      titulo : t,
      tipo : tipo,
      autor : autor,
      volume : v,
      edicao : ne,
      ano : ano,
      editora : ed,
      assuntos : assuntos,
      n_disponivel : nd,
      n_total : nt
    }

    this.http.get(autor_endpoint, this.options).subscribe(response => {
      this.getAutor(response);
      this.http.get(assunto_endpoint, this.options).subscribe(e => {
        this.getAssunto(e);
        localStorage.setItem("book", JSON.stringify(this.results));
      })
    })
  }

  getAutor(data){
    this.results.autor = data;
  }

  getAssunto(data){
    this.results.assuntos = data;
  }


  getnt(data){
    let r = 0;
    for(let x in data){
      r++;
    }
    return r;
  }

  getnd(data){
    let r = 0;
    for(let x in data){
      if(data[x].situacao_exemplar == "D"){
        r++;
      }
    }
    return r;
  }

  trataTitulo(str){
    str.toLowerCase();
    str.charAt(0).toUpperCase();
    return str;
  }
}
