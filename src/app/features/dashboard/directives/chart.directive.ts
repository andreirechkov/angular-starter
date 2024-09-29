import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { Nullable, WidgetDetails } from '../interfaces';

@Directive({
  selector: '[chart]',
  standalone: true,
})
export class ChartDirective implements AfterViewInit {
  private readonly _el: ElementRef = inject(ElementRef);

  private readonly _chartJs: any = new CanvasJS.Chart(this._el.nativeElement);

  @Input({ required: true })
  public set options(widget: Nullable<WidgetDetails>) {
    this._chartJs.options = widget?.options;
  }

  constructor() {
    this._el.nativeElement.style.width = '1400px';
    this._el.nativeElement.style.height = '350px';
  }

  public ngAfterViewInit(): void {
    this._chartJs.render();
  }
}
