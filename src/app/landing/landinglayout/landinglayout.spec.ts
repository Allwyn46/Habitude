import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Landinglayout } from './landinglayout';

describe('Landinglayout', () => {
  let component: Landinglayout;
  let fixture: ComponentFixture<Landinglayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landinglayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Landinglayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
