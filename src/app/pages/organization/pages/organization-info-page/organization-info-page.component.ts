import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '@organization-shared/services/organization.service';
import { IDetailedOrganization } from '@organization-shared/models/organization.model';
import { RouteData } from '../../models';

@Component({
  selector: 'app-organization-info-page',
  templateUrl: './organization-info-page.component.html',
  styleUrls: ['./organization-info-page.component.scss'],
})
export class OrganizationInfoPageComponent {
  private readonly _organization: IDetailedOrganization;

  public get organization(): IDetailedOrganization {
    return this._organization;
  }

  constructor(
    private readonly _organisationService: OrganizationService,
    private readonly _route: ActivatedRoute
  ) {
    this._organization = this._route.snapshot.data[RouteData.Organization];
  }
}
