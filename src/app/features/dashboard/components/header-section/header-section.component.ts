import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { filter, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WidgetManagerService } from '../../services';
import { ChartConfig, Nullable } from '../../interfaces';
import { ModalWidgetConfigComponent } from '../modal-widget-config/modal-widget-config.component';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSectionComponent implements OnInit {
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _widgetManagerService: WidgetManagerService = inject(WidgetManagerService);

  public readonly dialog: MatDialog = inject(MatDialog);
  public readonly disabledAddWidget$: Observable<boolean> = this._widgetManagerService.disabledAddWidget$;

  public startDate: Nullable<Date> = new Date();
  public endDate: Nullable<Date> = new Date();

  public ngOnInit(): void {
    this._initDates();
  }

  public addWidget(): void {
    this.dialog
      .open(ModalWidgetConfigComponent, { width: '500px' })
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((result: Nullable<ChartConfig>) => !!result)
      )
      .subscribe((result: Nullable<ChartConfig>): void => {
        this._widgetManagerService.addWidget({
          ...result,
          startDate: this.startDate,
          endDate: this.endDate,
        } as ChartConfig);
      });
  }

  public updateEndDate(): void {
    if (!this.startDate || !this.endDate) return;
    this._widgetManagerService.reload(this.startDate, this.endDate);
  }

  private _initDates(): void {
    if (this.startDate && this.endDate) {
      this.startDate.setDate(this.endDate.getMonth() - 14);
    }
  }
}
