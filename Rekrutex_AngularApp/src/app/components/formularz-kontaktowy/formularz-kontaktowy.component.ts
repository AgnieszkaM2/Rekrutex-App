import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';
import {UploadFileService} from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-formularz-kontaktowy',
  templateUrl: './formularz-kontaktowy.component.html',
  styleUrls: ['./formularz-kontaktowy.component.css']
})
export class FormularzKontaktowyComponent implements OnInit {

  cvForm: FormGroup;
  chosenCategory: any;
  choosenFile: File;
  selectedFiles: FileList;
  user: any;

  constructor(private fb: FormBuilder, private upload:UploadFileService, private http: HttpClient, private pytania: PytaniaTestService,private auth: AuthService, private router: Router) {
    this.cvForm = this.fb.group(
                                {
      'cv_tresc': [''],
      'cv_plik': ['']
      }
      );
    }
  
  selectFile(event){
    this.selectedFiles=event.target.files;
    
  }
  
  
  get cv_tresc() {
    return this.cvForm.get('cv_tresc')
  }
  get cv_plik() {
    return this.cvForm.get('cv_plik')
  }
  setCurrentUser() {
    this.user = this.auth.getCurrentUser();
    if(this.user.Id!=null){
    }
  }
  
  ngOnInit(): void {
    this.setCurrentUser();
    this.chosenCategory=sessionStorage.getItem('category');
  }
  submit(){
    
    this.sendEmail();
    this.sendFile();
  }
  
  sendEmail() {
    let resultData = {
      
      id: this.user.Id,
      f_name: this.user.Name,
      l_name: this.user.LastName,
      tresc: this.cvForm.value.cv_tresc,
      plik: this.cvForm.value.cv_plik,
      kategoria: this.chosenCategory
    };
    
    this.pytania.sendCvEmail(resultData).subscribe(
      data => {
      console.log(data);     
    },
    
    (error) => {
    })

  }
  sendFile(){
    let resultData = {
      
      id: this.user.Id,
      f_name: this.user.Name,
      l_name: this.user.LastName,
      tresc: this.cvForm.value.cv_tresc,
      plik: this.cvForm.value.cv_plik,
      kategoria: this.chosenCategory
    };
    
    this.choosenFile = this.selectedFiles.item(0);
    this.pytania.sendCvFile(this.choosenFile,resultData).subscribe(
      choosenFile => {
      console.log(choosenFile);     
    },
    
    (error) => {
    })
  }
  
}
