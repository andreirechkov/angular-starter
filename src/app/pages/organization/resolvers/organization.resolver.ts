import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationService } from '@organization-shared/services';
import { IDetailedOrganization } from '@organization-shared/models';

@Injectable()
export class OrganizationResolver implements Resolve<IDetailedOrganization> {
  constructor(private readonly _organizationService: OrganizationService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<IDetailedOrganization> {
    const { id } = route.params;
    return this._organizationService.getById(id);
  }
}
