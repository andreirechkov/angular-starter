import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganizationService } from '@organization-shared/services';
import { OrganizationResolver } from './organization.resolver';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService, OrganizationResolver],
    });
    resolver = TestBed.inject(OrganizationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
