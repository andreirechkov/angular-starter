import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { OrganizationSharedModule } from '@organization-shared/organization-shared.module';
import { RouterModule } from '@angular/router';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationListPageComponent, OrganizationInfoPageComponent } from './pages';
import { OrganizationResolver } from './resolvers';

@NgModule({
  declarations: [OrganizationListPageComponent, OrganizationInfoPageComponent],
  imports: [
    RouterModule,
    CommonModule,
    OrganizationRoutingModule,
    OrganizationSharedModule,
    SharedModule,
  ],
  providers: [OrganizationResolver],
})
export class OrganizationModule {}
