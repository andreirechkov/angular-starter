import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrganizationService } from '@organization-shared/services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [SharedModule, HttpClientModule],
  providers: [OrganizationService],
})
export class OrganizationSharedModule {}
