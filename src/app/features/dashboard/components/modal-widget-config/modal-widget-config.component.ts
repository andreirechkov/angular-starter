import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgxColorsModule } from 'ngx-colors';
import { Observable } from 'rxjs';
import { SELECTABLE_CHART_TYPE_OPTIONS } from '../../tokens';
import { TypeChart, ControlName } from '../../enums';
import { FormModalService } from '../../services/form-modal.service';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'app-header-section',
  templateUrl: './modal-widget-config.component.html',
  styleUrls: ['./modal-widget-config.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    NgxColorsModule,
    ReactiveFormsModule,
    BaseFormComponent,
  ],
  providers: [FormModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWidgetConfigComponent {
  protected readonly ControlName: typeof ControlName = ControlName;

  private readonly _formModalService: FormModalService = inject(FormModalService);

  public readonly multiForm$: Observable<boolean> = this._formModalService.multiForm$;

  public form: UntypedFormGroup = this._formModalService.form;
  public chartTypeOptions: TypeChart[] = [];

  public get additionalForm(): UntypedFormGroup {
    return this._formModalService.form.controls[ControlName.AdditionalChart] as UntypedFormGroup;
  }

  constructor(@Inject(SELECTABLE_CHART_TYPE_OPTIONS) private readonly _chartTypeOptions: TypeChart[]) {
    this.chartTypeOptions = this._chartTypeOptions;
  }
}
