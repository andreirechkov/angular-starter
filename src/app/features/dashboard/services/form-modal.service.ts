import { inject, Injectable } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { TypeChart, ControlName } from '../enums';

@Injectable()
export class FormModalService {
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);

  public readonly additionalForm: UntypedFormGroup = this._formBuilder.group({
    [ControlName.WidgetType]: [null, { validators: [Validators.required] }],
    [ControlName.NumberOfSensors]: [null, { validators: [Validators.required] }],
    [ControlName.Color]: [null],
  });

  public readonly form: UntypedFormGroup = this._formBuilder.group({
    [ControlName.WidgetType]: [null, { validators: [Validators.required] }],
    [ControlName.ChartType]: [null, { validators: [Validators.required] }],
    [ControlName.NumberOfSensors]: [null, { validators: [Validators.required] }],
    [ControlName.Color]: [null],
    [ControlName.IsMulti]: [null],
  });

  public readonly multiForm$: Observable<boolean> = this.form.controls[ControlName.IsMulti].valueChanges.pipe(
    tap((value: boolean) => this._updateForm(value))
  );

  private _updateForm(value: boolean): void {
    if (!value) {
      this.form.controls[ControlName.ChartType].enable();
      this.form.removeControl(ControlName.AdditionalChart);
      return;
    }
    this.form.controls[ControlName.ChartType].setValue(TypeChart.Line);
    this.form.controls[ControlName.ChartType].disable();
    this.form.addControl(ControlName.AdditionalChart, this.additionalForm);
  }
}
