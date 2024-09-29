import { InjectionToken } from '@angular/core';
import { TypeWidget } from '../enums';

export const selectableWidgetTypeOptionsFactory = (): TypeWidget[] => [
  TypeWidget.Temperature,
  TypeWidget.Humidity,
  TypeWidget.Light,
];

export const SELECTABLE_WIDGET_TYPE_OPTIONS: InjectionToken<TypeWidget[]> = new InjectionToken<TypeWidget[]>(
  'SELECTABLE_WIDGET_TYPE_OPTIONS',
  { factory: selectableWidgetTypeOptionsFactory }
);
