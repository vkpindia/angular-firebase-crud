import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTypeComponent } from './schema-type.component';

describe('SchemaTypeComponent', () => {
  let component: SchemaTypeComponent;
  let fixture: ComponentFixture<SchemaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
