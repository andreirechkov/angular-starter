import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionContentComponent } from './action-content.component';

describe('ActionContentComponent', () => {
  let component: ActionContentComponent;
  let fixture: ComponentFixture<ActionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionContentComponent],
    });
    fixture = TestBed.createComponent(ActionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
