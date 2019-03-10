import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatComponentComponent } from './repeat-component.component';

describe('RepeatComponentComponent', () => {
  let component: RepeatComponentComponent;
  let fixture: ComponentFixture<RepeatComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
