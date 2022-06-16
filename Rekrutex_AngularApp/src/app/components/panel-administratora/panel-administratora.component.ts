import { ViewChild, Component, OnInit } from '@angular/core';
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

  dodaniePytaniaForm: FormGroup;

  constructor(private fb: FormBuilder, private pytania: PytaniaTestService, private authService: AuthService, private router: Router){
    this.dodaniePytaniaForm = this.fb.group(
      {
        'dodaniePytania_tresc': [''],
        'dodaniePytania_odp1': [''],
        'dodaniePytania_odp2': [''],
        'dodaniePytania_odp3': [''],
        'dodaniePytania_odp4': [''],
      }
      );
  }
  
  ngOnInit(): void {
    this.pobieranieUzytkownikow();
    this.getCategory();
  }

  dodaniePytaniaError: boolean=false;
  errorMessage="";

  submit(){
    var kategoriaDoPytania = (document.getElementById("kategoriaPytania")) as HTMLSelectElement;
    var prawidlowaOdpowiedz = (document.getElementById("prawidlowaOdpowiedz")) as HTMLSelectElement;
    var tresc = (document.getElementById("tresc_pytania")) as HTMLSelectElement;
    var odp1 = (document.getElementById("odp1")) as HTMLSelectElement;
    var odp2 = (document.getElementById("odp2")) as HTMLSelectElement;
    var odp3 = (document.getElementById("odp3")) as HTMLSelectElement;
    var odp4 = (document.getElementById("odp4")) as HTMLSelectElement;
    var poprawnaOdpowiedz;
    if (Number(prawidlowaOdpowiedz.value) == 1){
      poprawnaOdpowiedz = odp1;
    }
    if (Number(prawidlowaOdpowiedz.value) == 2){
      poprawnaOdpowiedz = odp2;
    }
    if (Number(prawidlowaOdpowiedz.value) == 3){
      poprawnaOdpowiedz = odp3;
    }
    if (Number(prawidlowaOdpowiedz.value) == 4){
      poprawnaOdpowiedz = odp4;
    }
    let pytaniedata = {
      kategoria: kategoriaDoPytania.value,
      tresc: tresc.value,
      odp1: odp1.value,
      odp2: odp2.value,
      odp3: odp3.value,
      odp4: odp4.value,
      poprawna: poprawnaOdpowiedz.value,
      prawidlowa: prawidlowaOdpowiedz.value,
    };
    
    this.authService.dodaniePytania(pytaniedata).subscribe(
      data => {
      console.log(data); 
      console.log('wysłane')
      this.dodaniePytaniaForm.reset();
    },
    (error) => {
      if (error.status === 404) {
        this.errorMessage="Błąd serwera";
      }else if (error.status === 400) {
        this.errorMessage="Pytanie już istnieje, wprowadź inne dane.";
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
