import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, merge, Observable, scan, Subject, switchMap, tap } from 'rxjs';
import { ChartConfig, Nullable, SensorConfig, DataPoint, WidgetDetails } from '../interfaces';
import { ChartFormatType, TypeChart, WidgetStatus } from '../enums';
import { DEFAULT_OPTIONS } from '../constants';
import { WidgetDataService } from './widget-data.service';

@Injectable()
export class WidgetManagerService {
  private readonly _widgetDataService: WidgetDataService = inject(WidgetDataService);
  private readonly _availableWidgetCount: number = 4;
  private readonly _widget$: Subject<ChartConfig> = new Subject<ChartConfig>();
  private readonly _deleteWidget$: Subject<WidgetDetails> = new Subject<WidgetDetails>();
  private readonly _disabledAddWidget$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly _loadWidget$: Observable<WidgetDetails> = this._widget$.pipe(
    map(
      (value: ChartConfig): WidgetDetails => ({
        ...value,
        id: `${Math.random()}`,
        status: WidgetStatus.New,
        options: { ...DEFAULT_OPTIONS },
      })
    ),
    switchMap((widget: WidgetDetails) => {
      return combineLatest(this._prepareRequestForCharts(widget)).pipe(
        map((data: SensorConfig[]): WidgetDetails => ({ ...widget, options: { ...widget.options, data } }))
      );
    })
  );

  private _availableWidgets: WidgetDetails[] = [];

  public readonly disabledAddWidget$: Observable<boolean> = this._disabledAddWidget$;
  public readonly widgetList$: Observable<WidgetDetails[]> = merge(this._loadWidget$, this._deleteWidget$).pipe(
    scan((widgets: WidgetDetails[], widget: WidgetDetails): WidgetDetails[] => {
      if (widget.status === WidgetStatus.New) {
        return this._addNewWidget(widgets, widget);
      }
      return this._removeWidget(widgets, widget);
    }, []),
    tap((widgets: WidgetDetails[]): void => {
      this._availableWidgets = widgets;
      this._disabledAddWidget$.next(widgets.length === this._availableWidgetCount);
    })
  );

  public addWidget(value: ChartConfig): void {
    this._widget$.next(value);
  }

  public deleteWidget(value: WidgetDetails): void {
    this._deleteWidget$.next({ ...value, status: WidgetStatus.Delete });
  }

  public reload(startDate: Date, endDate: Date): void {
    this._availableWidgets.forEach((item: WidgetDetails): void => {
      this.deleteWidget(item);
      this.addWidget({ ...item, startDate, endDate });
    });
  }

  private _addNewWidget(widgets: WidgetDetails[], widget: WidgetDetails): WidgetDetails[] {
    return [...widgets, widget];
  }

  private _removeWidget(widgets: WidgetDetails[], widget: WidgetDetails): WidgetDetails[] {
    return widgets.filter(({ id }: WidgetDetails): boolean => id !== widget.id);
  }

  private _generateObsSettingSensor(
    widgetType: Nullable<string>,
    quantitySensor: Nullable<number>,
    startDate: Nullable<Date>,
    endDate: Nullable<Date>,
    chartType: Nullable<string>,
    color: Nullable<string>,
    multiLine: boolean = false,
    additionalSecondChartSettings: { axisYType?: string } = {}
  ): Observable<SensorConfig>[] {
    const countRequest: number[] = [...Array(quantitySensor).keys()];
    return countRequest.map((sensor: number) => {
      return this._widgetDataService.detailsSensor(startDate, endDate, multiLine).pipe(
        map((dataPoints: DataPoint[]): SensorConfig => {
          return {
            name: `Sensor ${widgetType} - ${sensor + 1}`,
            type: chartType,
            showInLegend: true,
            xValueFormatString: ChartFormatType.MMM_DD_YYYY,
            color,
            dataPoints,
            ...additionalSecondChartSettings,
          };
        })
      );
    });
  }

  private _prepareRequestForCharts(widget: WidgetDetails): Observable<SensorConfig>[] {
    if (widget.isMulti) {
      const firstType: Observable<SensorConfig>[] = this._generateObsSettingSensor(
        widget.widgetType,
        widget.numberOfSensors,
        widget.startDate,
        widget.endDate,
        TypeChart.Candlestick,
        widget.color,
        true
      );
      const secondType: Observable<SensorConfig>[] = this._generateObsSettingSensor(
        widget.additionalChart?.widgetType,
        widget.additionalChart?.numberOfSensors,
        widget.startDate,
        widget.endDate,
        'line',
        widget.additionalChart?.color,
        false,
        { axisYType: 'secondary' }
      );
      return [...firstType, ...secondType];
    }

    return this._generateObsSettingSensor(
      widget.widgetType,
      widget.numberOfSensors,
      widget.startDate,
      widget.endDate,
      widget.chartType,
      widget.color
    );
  }
}
