import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Uzytkownik } from 'src/app/_models/uzytkownik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  
  User: any;
  loginForm: FormGroup;
  loginStatus: boolean=false;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.loginForm = this.fb.group({
      'userLogin': [''],
      'password': ['']})
  }

  ngOnInit(): void {
  }

  get userLogin() {
    return this.loginForm.get('userLogin')
    
  }

  get password() {
    return this.loginForm.get('password')
    
  }

  redirecting: boolean=false;
  
  redirect(){
    this.router.navigateByUrl("/strona-glowna");
  }
  
login() {
    let loginData = {
      
      login: this.loginForm.value.userLogin,
      haslo: this.loginForm.value.password
    };
    this.authService.login(loginData).subscribe(
      data => {
      console.log(data); 
      this.loginStatus=true;
    },
    (res: any) =>{
      console.log('success');
      this.loginStatus=true;
      setTimeout(() => {
        this.redirecting=true;
      }, 5000),  //5s
      this.redirect();     
    })  
  }

  logout() {
    this.authService.logout();
    this.loginStatus = false;
  }
  goBack(): void {
    this.loginError=false;
  }

}
