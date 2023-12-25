import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SParaComponent } from './s-para.component';

describe('SParaComponent', () => {
  let component: SParaComponent;
  let fixture: ComponentFixture<SParaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SParaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
