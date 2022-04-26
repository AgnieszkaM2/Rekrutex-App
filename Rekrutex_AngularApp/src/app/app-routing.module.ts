import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StronaGlownaComponent } from './components/strona-glowna/strona-glowna.component';
import { LogowanieComponent } from './components/logowanie/logowanie.component';
import { RejestracjaComponent } from './components/rejestracja/rejestracja.component';
import { KategorieComponent } from './components/kategorie/kategorie.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormularzKontaktowyComponent } from './components/formularz-kontaktowy/formularz-kontaktowy.component';
import { PanelAdministratoraComponent } from './components/panel-administratora/panel-administratora.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'strona-glowna', pathMatch: 'full'},
  { path: 'strona-glowna', component: StronaGlownaComponent },
  { path: 'logowanie', component: LogowanieComponent },
  { path: 'rejestracja', component: RejestracjaComponent },
  { path: 'kategorie', component: KategorieComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'formularz-kontaktowy', component: FormularzKontaktowyComponent },
  { path: 'panel-administratora', component: PanelAdministratoraComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
