import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Uzytkownik } from 'src/app/_models/uzytkownik';
import { Router } from '@angular/router';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';

@Component({
  selector: 'app-panel-administratora',
  templateUrl: './panel-administratora.component.html',
  styleUrls: ['./panel-administratora.component.css']
})

export class PanelAdministratoraComponent implements OnInit {

  constructor(private fb: FormBuilder, private pytania: PytaniaTestService, private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.pobieranieUzytkownikow();
    this.getCategory();
  }
id:any= "jeden";
users:any;
Questions:any;
chosenCategory:any;
categories: any;
bool:any="false";
getCategory() {
  this.pytania.getCategories().subscribe(response => {
    this.categories = response;
  }, error => {
    console.log(error);
  })
}

buttonClickPytania(){
  var e = (document.getElementById("test")) as HTMLSelectElement;
  this.chosenCategory = e.value;
  this.bool="true";
  this.pobieraniePytan();
}

tabChange(ids:any){
  
  
  if(this.id=='dwa'){
    
  }
  if(this.id=='trzy'){
    
  }
  this.id = ids;
}
pobieranieUzytkownikow() {
  this.authService.getAllUsers().subscribe(response => {
    this.users = response;
  }, error => {
    console.log(error);
  })
}
pobieraniePytan() {
  let categorydata = {
    kategoria: this.chosenCategory
  }
  this.pytania.getQuestions(categorydata).subscribe(response => {
    //console.log(response);
    this.Questions = response;
  }, error => {
    console.log(error);
  })
}

}
