import { InjectionToken } from '@angular/core';
import { TypeChart } from '../enums';

export const selectableChartTypeOptionsFactory = (): TypeChart[] => [TypeChart.Bar, TypeChart.Line, TypeChart.Column];

export const SELECTABLE_CHART_TYPE_OPTIONS: InjectionToken<TypeChart[]> = new InjectionToken<TypeChart[]>(
  'SELECTABLE_CHART_TYPE_OPTIONS',
  { factory: selectableChartTypeOptionsFactory }
);
