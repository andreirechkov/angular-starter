export enum WidgetStatus {
  New = 'new',
  Update = 'update',
  Delete = 'delete',
}

export enum TypeChart {
  Candlestick = 'candlestick',
  Bar = 'bar',
  Line = 'line',
  Column = 'column',
}

export enum TypeWidget {
  Temperature = 'Temperature',
  Humidity = 'Humidity',
  Light = 'Light',
}

export enum ControlName {
  IsMulti = 'isMulti',
  NumberOfSensors = 'numberOfSensors',
  Color = 'color',
  AdditionalChart = 'additionalChart',
  WidgetType = 'widgetType',
  ChartType = 'chartType',
}

export enum ChartFormatType {
  MMM_DD_YYYY = 'MMM DD, YYYY',
}
