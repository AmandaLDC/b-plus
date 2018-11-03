import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { SearchService } from '../search/search.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  results: any = [];
  suggestions: any = [];
  queryField: FormControl = new FormControl();

  constructor(public router: Router, private _searchService: SearchService) { }

  ngOnInit() {
    this.queryField.valueChanges
    .distinctUntilChanged()
    .subscribe(queryField => this._searchService.search(queryField)
    .subscribe(response => this.results = response))
    //for(let x=1;x>10;x++){
    //  if(this.results[x].id_material != this.results[x-1].id_material){
    //    this.suggestions[x-1] = this.results[x].titulo_material;
    //  }
    //}
    //console.log(this.suggestions
  }

  onClick(str : string){
    this._searchService.save(str);
    this.results = [];
    this.queryField = new FormControl();
    this.router.navigate(['/expand-list']);
  }

}
