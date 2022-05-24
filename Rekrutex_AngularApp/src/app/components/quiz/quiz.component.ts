import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PytaniaTestService } from 'src/app/services/pytania-test.service';
import { Pytanie } from 'src/app/_models/pytania';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private pytania: PytaniaTestService, private http: HttpClient, private auth: AuthService, private router: Router) {
    this.quizForm = this.fb.group({
      'odpowiedzi': ['']});
    // this.pytania.currentCategory$.subscribe(
    //   data => {
    //     if(this.chosenCategory !== data){
    //       this.chosenCategory = data;
    //     }
    //   });
   }
  
  user : any;
  Questions : any;
  ShuffledArray: any;
  AnswersArray=[];
  isDone : boolean = false;
  hasPassed : boolean = false;
  iterator = 0;
  wynik=0;
  procent=0;
  isLogged: boolean = false;
  timerlimit = 20;
  timer = this.timerlimit;
  interval;

  chosenCategory: any;
  //subscription: Subscription;

  ngOnInit(): void {
    //this.subscription = this.pytania.currentCategory$.subscribe(category => this.chosenCategory = category)
    this.chosenCategory=sessionStorage.getItem('category');
    //console.log(this.chosenCategory);
    this.getQuestions();
    this.isDone=false;
    this.hasPassed=false;
    this.setCurrentUser();
  }

  get odpowiedzi() {
    return this.quizForm.get('odpowiedzi')
    
  }

  getQuestions() {
    let categorydata = {
      kategoria: this.chosenCategory
    }
    this.pytania.getQuestions(categorydata).subscribe(response => {
      //console.log(response);
      this.Questions = response;
      this.ShuffledArray = this.Questions;
      this.shuffle(this.ShuffledArray)

    }, error => {
      console.log(error);
    })
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timer > 0) {
        this.timer--;
      } else {
        this.timer = this.timerlimit;
      }
    },1000)
  }

  addAnswer(answer){
    this.AnswersArray.push(answer);
    //console.log(this.AnswersArray);
    //console.log(this.iterator);
    if(this.AnswersArray.length==this.ShuffledArray.length){
      this.isDone=true;
      this.countResults();
    }
    if(this.iterator<this.ShuffledArray.length-1){
      this.iterator+=1;
      this.quizForm.controls['odpowiedzi'].reset();
      
    }
  }

  countResults() {
    for(let i=0; i<this.AnswersArray.length; i++){
      if(this.AnswersArray[i] == this.ShuffledArray[i].prawidlowa){
        this.wynik+=1;
      }
    }
    this.procent= (this.wynik/this.AnswersArray.length) *100;
    if(this.procent>=60){
      this.hasPassed=true;
    }

  }

  setCurrentUser() {
    this.user = this.auth.getCurrentUser();
    if(this.user.Id!=null){
      this.isLogged=true;
    }
  }

  sendResult() {
    console.log(this.user.userId);
    let resultData = {
      
      id: this.user.Id,
      wynik: this.procent
    };
    this.pytania.sendResult(resultData).subscribe(
      data => {
      console.log(data);     
    },
    (error) => {
    })

  }

  redirect(){
    this.router.navigateByUrl("/strona-glowna")
    .then(() => {
      window.location.reload();
    });
  }

  goBack() {
    this.sendResult();
    this.redirect();
  }

  submit() {
    this.addAnswer(this.quizForm.value.odpowiedzi)
  }

}
