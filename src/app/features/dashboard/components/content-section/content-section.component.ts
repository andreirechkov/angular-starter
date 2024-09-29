import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { WidgetManagerService } from '../../services';
import { WidgetDetails } from '../../interfaces';
import { ActionContentComponent } from '../action-content/action-content.component';
import { ChartDirective } from '../../directives/chart.directive';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss'],
  standalone: true,
  imports: [CommonModule, ActionContentComponent, CanvasJSAngularChartsModule, ChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSectionComponent {
  public readonly widgets$: Observable<WidgetDetails[]> = inject(WidgetManagerService).widgetList$;
}
