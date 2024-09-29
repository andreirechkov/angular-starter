import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BooleanInput } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { HasPermissionDisableButtonDirective } from '../../directives';
import { Nullable } from '../../../../features/dashboard/interfaces';
import { ButtonTooltipService } from '../../services/button-tooltip.service';

@Component({
  selector: 'app-extended-button',
  templateUrl: './extended-button.component.html',
  styleUrls: ['./extended-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, HasPermissionDisableButtonDirective],
})
export class ExtendedButtonComponent {
  private readonly _buttonTooltipService: ButtonTooltipService = inject(ButtonTooltipService);

  @Input() public permission: Nullable<string> = null;
  @Input() public set viewerTooltip(value: Nullable<string>) {
    this._buttonTooltipService.updateCustomViewerTooltip(value);
  }

  @Input({ transform: booleanAttribute })
  public set isViewerDisabled(value: BooleanInput) {
    this._buttonTooltipService.updateViewerDisabled(value);
  }

  public readonly viewerTooltip$: Observable<string> = this._buttonTooltipService.viewerTooltip$;
  public readonly disabledTooltip$: Observable<boolean> = this._buttonTooltipService.disabledTooltip$;
}
