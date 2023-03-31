export const API = {
  organizations: {
    list: '/api/organizations',
    byId: (id: string): string => `/api/organization/${id}`,
  },
};

export enum PageNames {
  Organizations = 'Organizations',
}

export enum QueryParams {
  Page = 'page',
  Limit = 'limit',
  Search = 'search',
  ContractType = 'contractType',
}
