import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, combineLatest } from 'rxjs';
import { BooleanInput } from '@angular/cdk/coercion';
import { Nullable } from '../../../features/dashboard/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ButtonTooltipService {
  private readonly _viewerTooltip$: BehaviorSubject<Nullable<string>> = new BehaviorSubject<Nullable<string>>(null);
  private readonly _customTooltip$: BehaviorSubject<Nullable<string>> = new BehaviorSubject<Nullable<string>>(null);
  private readonly _disabledTooltip$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly _viewerDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly viewerTooltip$: Observable<string> = combineLatest([this._customTooltip$, this._viewerTooltip$]).pipe(
    map(([custom, original]: Nullable<string>[]) => custom || original || '')
  );

  public get disabledTooltip$(): Observable<boolean> {
    return this._disabledTooltip$;
  }

  public get viewerDisabled$(): Observable<boolean> {
    return this._viewerDisabled$;
  }

  public updateViewerTooltip(value: Nullable<string>): void {
    this._viewerTooltip$.next(value);
  }

  public updateCustomViewerTooltip(value: Nullable<string>): void {
    this._customTooltip$.next(value);
  }

  public updateDisabledTooltip(value: boolean): void {
    this._disabledTooltip$.next(value);
  }

  public updateViewerDisabled(value: BooleanInput): void {
    this._viewerDisabled$.next(!!value);
  }
}
