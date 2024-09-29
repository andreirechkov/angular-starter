import { WidgetStatus } from '../enums';

export declare type Nullable<T = void> = T | null | undefined;

interface Axis {
  valueFormatString: string;
}

interface TooltipChart {
  shared: boolean;
}

export interface DataPoint {
  x: Nullable<number | string | Date>;
  y: Nullable<number | number[]>;
}

export interface SensorConfig {
  name: Nullable<string>;
  type: Nullable<string>;
  showInLegend: boolean;
  dataPoints: DataPoint[];
  xValueFormatString?: Nullable<string>;
  yValueFormatString?: Nullable<string>;
  axisYType?: Nullable<string>;
  color?: Nullable<string>;
}

export interface OptionChart {
  axisX: Axis;
  animationEnabled: boolean;
  theme: string;
  toolTip: TooltipChart;
  data: SensorConfig[];
}

export interface WidgetDetails extends ChartConfig {
  id: string;
  status: WidgetStatus;
  options: OptionChart;
}

export interface BaseChartConfig {
  widgetType: Nullable<string>;
  numberOfSensors: Nullable<number>;
  color: Nullable<string>;
}

export interface ChartConfig extends BaseChartConfig {
  isMulti: boolean;
  chartType: Nullable<string>;
  additionalChart?: Nullable<BaseChartConfig>;
  startDate?: Nullable<Date>;
  endDate?: Nullable<Date>;
}
