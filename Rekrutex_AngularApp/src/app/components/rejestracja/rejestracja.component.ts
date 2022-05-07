import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.registerForm = this.fb.group({
      'imie': ['', Validators.required],
      'nazwisko': ['', Validators.required],
      'email': ['', Validators.required],
      'nr_telefonu': ['', Validators.required],
      'login': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordConfirm': ['', Validators.required]},
       {validator: this.MustMatch('password', 'passwordConfirm')})
  }

  get imie() {
    return this.registerForm.get('imie')
    
  }

  get nazwisko() {
    return this.registerForm.get('nazwisko')
    
  }

  get email() {
    return this.registerForm.get('email')
    
  }

  get nr_telefonu() {
    return this.registerForm.get('nr_telofonu')
    
  }

  get login() {
    return this.registerForm.get('login')
    
  }

  get password() {
    return this.registerForm.get('password')
    
  }
  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm')
    
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMismatch: true });
        } else {
            matchingControl.setErrors(null);
            
        }
    }
  }

  registerStatus: boolean=false;
  registerError: boolean=false;
  errorMessage="";

  register() {
    let registerData = {
      login: this.registerForm.value.login,
      haslo: this.registerForm.value.password,
      imie: this.registerForm.value.imie,
      nazwisko: this.registerForm.value.nazwisko,
      nr_telefonu: this.registerForm.value.nr_telefonu,
      email: this.registerForm.value.email,
    };
    this.authService.register(registerData).subscribe(
      data => {
      console.log(data); 
      this.registerStatus=true;
      console.log('wysłane')
    },
    (error) => {
      if (error.status === 404) {
        this.errorMessage="Błąd serwera";
      }else if (error.status === 400) {
        this.errorMessage="Użytkownik już istnieje, wprowadź inne dane.";
      }else {
        this.errorMessage="";
      }
      this.registerError=true;
    }) 
    
  }
  goBack(): void {
    this.registerError=false;
  }

  ngOnInit(): void {
  }

}
