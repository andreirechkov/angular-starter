import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Nullable, WidgetDetails } from '../../interfaces';
import { WidgetManagerService } from '../../services';

@Component({
  selector: 'app-action-content',
  templateUrl: './action-content.component.html',
  styleUrls: ['./action-content.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionContentComponent {
  private readonly _widgetManagerService: WidgetManagerService = inject(WidgetManagerService);

  @Input({ required: true }) public widget: Nullable<WidgetDetails> = null;

  public deleteWidget(): void {
    if (!this.widget) {
      return;
    }
    this._widgetManagerService.deleteWidget(this.widget);
  }
}
