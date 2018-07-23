import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalGridComponent } from './hal-grid.component';

describe('PageableResourceGridComponent', () => {
  let component: HalGridComponent<any>;
  let fixture: ComponentFixture<HalGridComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
