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
    this.empty1();
    this.empty2();
  }
id:any= "jeden";
users:any;
Questions:any;
chosenCategory:any="Informatyk";
bool:any="false";
setCategory(value){
  this.chosenCategory = value;
}
tabChange(ids:any){
  
  
  if(this.id=='dwa'){
    
  }
  if(this.id=='trzy'){
    
  }
  this.id = ids;
}
empty1() {
  this.authService.getAllUsers().subscribe(response => {
    this.users = response;
  }, error => {
    console.log(error);
  })
}
empty2() {
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
