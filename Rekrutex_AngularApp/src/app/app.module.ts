import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StronaGlownaComponent } from './components/strona-glowna/strona-glowna.component';
import { LogowanieComponent } from './components/logowanie/logowanie.component';
import { RejestracjaComponent } from './components/rejestracja/rejestracja.component';
import { KategorieComponent } from './components/kategorie/kategorie.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormularzKontaktowyComponent } from './components/formularz-kontaktowy/formularz-kontaktowy.component';
import { PanelAdministratoraComponent } from './components/panel-administratora/panel-administratora.component';

@NgModule({
  declarations: [
    AppComponent,
    StronaGlownaComponent,
    LogowanieComponent,
    RejestracjaComponent,
    KategorieComponent,
    QuizComponent,
    FormularzKontaktowyComponent,
    PanelAdministratoraComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
