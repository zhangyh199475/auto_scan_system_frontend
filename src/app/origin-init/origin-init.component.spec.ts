import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginInitComponent } from './origin-init.component';

describe('OriginInitComponent', () => {
  let component: OriginInitComponent;
  let fixture: ComponentFixture<OriginInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
