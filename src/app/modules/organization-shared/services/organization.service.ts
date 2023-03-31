import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '@constants';
import {
  IAddOrganizationData,
  IAddOrganizationResponse,
  IDetailedOrganization,
  IOrganizationResponse,
} from '../models/organization.model';

@Injectable()
export class OrganizationService {
  constructor(private readonly _http: HttpClient) {}

  public getList(query?: HttpParams): Observable<IOrganizationResponse> {
    return this._http.get<IOrganizationResponse>(API.organizations.list, { params: query });
  }

  public getById(id: string): Observable<IDetailedOrganization> {
    return this._http.get<IDetailedOrganization>(API.organizations.byId(id));
  }

  public create(body: IAddOrganizationData): Observable<IAddOrganizationResponse> {
    return this._http.post<IAddOrganizationResponse>(API.organizations.list, body);
  }

  public updateById(
    id: string,
    body: Partial<IDetailedOrganization>
  ): Observable<IDetailedOrganization> {
    return this._http.patch<IDetailedOrganization>(API.organizations.byId(id), body);
  }

  public deleteById(id: string): Observable<IDetailedOrganization> {
    return this._http.delete<IDetailedOrganization>(API.organizations.byId(id));
  }
}
