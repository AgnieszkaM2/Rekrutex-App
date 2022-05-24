import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-kategorie',
  templateUrl: './kategorie.component.html',
  styleUrls: ['./kategorie.component.css']
})
export class KategorieComponent implements OnInit {

  categories: any;
  chosenCategory: any;
  subscription: Subscription;


  constructor(private pytania: PytaniaTestService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategory();
    //this.subscription = this.pytania.currentCategory$.subscribe(category => this.chosenCategory = category)
  }

  getCategory() {
    this.pytania.getCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    })
  }

  setCategory(category) {
    this.chosenCategory= category;
    //this.pytania.changeCategory(category);
    sessionStorage.setItem('category', category);
  }
}
