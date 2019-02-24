import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeViewDetailsComponent } from './recipe-view-details.component';

describe('RecipeViewDetailsComponent', () => {
  let component: RecipeViewDetailsComponent;
  let fixture: ComponentFixture<RecipeViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
