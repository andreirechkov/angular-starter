import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IOrganizationResponse } from '@organization-shared/models';
import { OrganizationService } from '@organization-shared/services';
import { Nullable } from '../../../../models';

@Component({
  selector: 'app-organization-info-page',
  templateUrl: './organization-list-page.component.html',
  styleUrls: ['./organization-list-page.component.scss'],
})
export class OrganizationListPageComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  private _organizations: Nullable<IOrganizationResponse> = null;
  private _isLoading: boolean = false;

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public get organizations(): Nullable<IOrganizationResponse> {
    return this._organizations;
  }

  constructor(private readonly _organizationService: OrganizationService) {}

  public ngOnInit(): void {
    this._getList();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getList(): void {
    this._isLoading = true;
    this._organizationService
      .getList()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (response: IOrganizationResponse) => {
          this._organizations = response;
        },
        complete: () => {
          this._isLoading = false;
        },
      });
  }
}
