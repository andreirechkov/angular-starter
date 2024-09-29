import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWidgetConfigComponent } from './modal-widget-config.component';

describe('ModalWidgetConfigComponent', () => {
  let component: ModalWidgetConfigComponent;
  let fixture: ComponentFixture<ModalWidgetConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWidgetConfigComponent],
    });
    fixture = TestBed.createComponent(ModalWidgetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
