import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganizationService } from '@organization-shared/services';
import { OrganizationInfoPageComponent } from './organization-info-page.component';

describe('OrganizationInfoComponent', () => {
  let component: OrganizationInfoPageComponent;
  let fixture: ComponentFixture<OrganizationInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [OrganizationInfoPageComponent],
      providers: [OrganizationService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
