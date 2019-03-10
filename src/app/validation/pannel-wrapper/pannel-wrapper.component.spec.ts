import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelWrapperComponent } from './pannel-wrapper.component';

describe('PannelWrapperComponent', () => {
  let component: PannelWrapperComponent;
  let fixture: ComponentFixture<PannelWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PannelWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PannelWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
