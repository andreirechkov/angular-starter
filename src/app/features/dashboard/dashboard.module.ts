import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardPageComponent } from './pages';
import { HeaderSectionComponent, ContentSectionComponent } from './components';
import { WidgetManagerService } from './services';
import { WidgetDataService } from './services/widget-data.service';
import { ExtendedButtonComponent } from '../../libs/shared/components';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DashboardPageComponent }]),
    HeaderSectionComponent,
    ContentSectionComponent,
    MatDialogModule,
    ExtendedButtonComponent,
  ],
  providers: [WidgetManagerService, WidgetDataService],
})
export class DashboardModule {}
