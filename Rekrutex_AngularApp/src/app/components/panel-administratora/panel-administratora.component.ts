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

  dodatniePytaniaForm: FormGroup;

  constructor(private fb: FormBuilder, private pytania: PytaniaTestService, private authService: AuthService, private router: Router){
    this.dodatniePytaniaForm = this.fb.group(
      {
        'dodatniePytania_tresc': [''],
        'dodatniePytania_odp1': [''],
        'dodatniePytania_odp2': [''],
        'dodatniePytania_odp3': [''],
        'dodatniePytania_odp4': [''],
      }
      );
  }
  ngOnInit(): void {
    this.pobieranieUzytkownikow();
    this.getCategory();
  }

  get dodatniePytania_tresc() {
    return this.dodatniePytaniaForm.get('dodatniePytania_tresc')
  }
  get dodatniePytania_odp1() {
    return this.dodatniePytaniaForm.get('dodatniePytania_odp1')
  }
  get dodatniePytania_odp2() {
    return this.dodatniePytaniaForm.get('dodatniePytania_odp2')
  }
  get dodatniePytania_odp3() {
    return this.dodatniePytaniaForm.get('dodatniePytania_odp3')
  }
  get dodatniePytania_odp4() {
    return this.dodatniePytaniaForm.get('dodatniePytania_odp4')
  }

  dodaniePytaniaError: boolean=false;
  errorMessage="";



  submit(){
    var kategoriaDoPytania = (document.getElementById("test2")) as HTMLSelectElement;
    var poprawnaOdpowiedz = (document.getElementById("test2")) as HTMLSelectElement;
    let pytaniedata = {
      kategoria: kategoriaDoPytania.value,
      tresc: this.dodatniePytaniaForm.value.tresc,
      odp1: this.dodatniePytaniaForm.value.odp1,
      odp2: this.dodatniePytaniaForm.value.odp2,
      odp3: this.dodatniePytaniaForm.value.odp3,
      odp4: this.dodatniePytaniaForm.value.odp4,
      poprawna: poprawnaOdpowiedz.value,
      prawidlowa: poprawnaOdpowiedz.value,
    };
    this.authService.dodaniePytania(pytaniedata).subscribe(
      data => {
      console.log(data); 
      console.log('wysłane')
      this.dodatniePytaniaForm.controls['dodatniePytania_tresc'].reset();
      this.dodatniePytaniaForm.controls['dodatniePytania_odp1'].reset();
      this.dodatniePytaniaForm.controls['dodatniePytania_odp2'].reset();
      this.dodatniePytaniaForm.controls['dodatniePytania_odp3'].reset();
      this.dodatniePytaniaForm.controls['dodatniePytania_odp4'].reset();
    },
    (error) => {
      if (error.status === 404) {
        this.errorMessage="Błąd serwera";
      }else if (error.status === 400) {
        this.errorMessage="Użytkownik już istnieje, wprowadź inne dane.";
      }else {
        this.errorMessage="";
      }
      this.dodaniePytaniaError=true;
    })

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
  var kategoriaDlaPytan = (document.getElementById("test")) as HTMLSelectElement;
  this.chosenCategory = kategoriaDlaPytan.value;
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
