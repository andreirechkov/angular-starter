import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Nullable, DataPoint } from '../interfaces';

@Injectable()
export class WidgetDataService {
  public detailsSensor(start: Nullable<Date>, end: Nullable<Date>, multiLine: boolean): Observable<DataPoint[]> {
    return of(this._generateDataPoints(start, end, multiLine));
  }

  private _generateDataPoints(start: Nullable<Date>, end: Nullable<Date>, multiLine: boolean): DataPoint[] {
    if (!start || !end) {
      return [];
    }
    return this._getDatesBetween(start, end).map(
      (item: Date): DataPoint => ({
        x: item,
        y: this._generateFakeNumber(multiLine),
      })
    );
  }

  private _getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    const currentDate: Date = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  private _generateFakeNumber(multiLine: boolean): number | number[] {
    if (!multiLine) {
      return Math.floor(Math.random() * 100);
    }
    return Array.from({ length: 4 }).map(() => Math.round(Math.random() * 44 * 100) / 100);
  }
}
