import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularzKontaktowyComponent } from './formularz-kontaktowy.component';

describe('FormularzKontaktowyComponent', () => {
  let component: FormularzKontaktowyComponent;
  let fixture: ComponentFixture<FormularzKontaktowyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularzKontaktowyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularzKontaktowyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
