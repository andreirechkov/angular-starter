import { NgModule } from '@angular/core';
import { Data, RouterModule, Routes } from '@angular/router';
import { PageNames } from '@constants';
import { OrganizationListPageComponent, OrganizationInfoPageComponent } from './pages';
import { OrganizationResolver } from './resolvers';
import { RouteData } from './models';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: PageNames.Organizations,
    },
    children: [
      {
        path: '',
        component: OrganizationListPageComponent,
        data: {
          breadcrumb: null,
        },
      },
      {
        path: ':id',
        data: {
          breadcrumb: (data: Data) => data[RouteData.Organization].name,
        },
        resolve: {
          organization: OrganizationResolver,
        },
        children: [
          {
            path: '',
            component: OrganizationInfoPageComponent,
            data: {
              breadcrumb: null,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
