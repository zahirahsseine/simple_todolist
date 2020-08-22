import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingtasksComponent } from './listingtasks.component';

describe('ListingtasksComponent', () => {
  let component: ListingtasksComponent;
  let fixture: ComponentFixture<ListingtasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingtasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
