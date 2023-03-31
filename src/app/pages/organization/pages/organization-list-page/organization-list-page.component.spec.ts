import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationService } from '@organization-shared/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganizationListPageComponent } from './organization-list-page.component';

describe('OrganizationListPageComponent', () => {
  let component: OrganizationListPageComponent;
  let fixture: ComponentFixture<OrganizationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrganizationListPageComponent],
      providers: [OrganizationService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
