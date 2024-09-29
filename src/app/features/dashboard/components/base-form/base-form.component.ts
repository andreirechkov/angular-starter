import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxColorsModule } from 'ngx-colors';
import { ControlName, TypeWidget } from '../../enums';
import { SELECTABLE_WIDGET_TYPE_OPTIONS } from '../../tokens';
import { Nullable } from '../../interfaces';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, NgxColorsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseFormComponent {
  protected readonly ControlName: typeof ControlName = ControlName;

  @Input() public form: Nullable<UntypedFormGroup> = null;

  public widgetTypeOptions: TypeWidget[] = [];

  constructor(@Inject(SELECTABLE_WIDGET_TYPE_OPTIONS) private readonly _widgetTypeOptions: TypeWidget[]) {
    this.widgetTypeOptions = this._widgetTypeOptions;
  }
}
