import { IMeta } from '@shared/models/meta.interface';
import { IStringId, Nullable } from '../../../models';

export interface IOrganization {
  id: number;
  name: string;
  contractStartDate: string;
  contractEndDate: string;
  contractType: number | string;
  status: string;
  totalSeatLicenses?: number;
}

export interface IOrganizationResponse {
  data: IOrganization[];
  meta: IMeta;
  count: number;
}

export interface IDetailedOrganization extends IStringId {
  name: Nullable<string>;
  code: Nullable<string>;
  country?: Nullable<string>;
  statistics?: IStatistics;
  users: IUserInfo[];
  address?: string;
}

export interface IAddOrganizationData {
  name: string;
  country: string;
}

export interface IAddOrganizationResponse {
  id: string;
}

export interface IUserInfo extends IStringId {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  address?: string;
}

export interface IStatistics {
  total: number;
  monthly: { total: number; data: number[] };
}
