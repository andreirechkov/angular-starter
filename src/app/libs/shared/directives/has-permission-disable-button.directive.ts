import { DestroyRef, Directive, inject, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { map, Observable, of, combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonTooltipService } from '../services/button-tooltip.service';
import { Nullable } from '../../../features/dashboard/interfaces';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDisableButtonDirective implements OnInit {
  private readonly _buttonTooltipService: ButtonTooltipService = inject(ButtonTooltipService);
  private readonly _viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private readonly _templateRef: TemplateRef<unknown> = inject(TemplateRef);
  private readonly _renderer: Renderer2 = inject(Renderer2);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private readonly _viewDisabled$: Observable<void> = this._buttonTooltipService.viewerDisabled$.pipe(
    map((value: boolean): void => {
      if (value) {
        this._disableState('You cannot do it');
      }

      if (!value && this._isSuccessPermission) {
        this._enableState();
      }
    })
  );

  private readonly _permission$: Observable<void> = of(['createUser', 'updateUser']).pipe(
    map((permissions: string[]): void => {
      this._isSuccessPermission = !!(this._permission && permissions.includes(this._permission));
      if (this._isSuccessPermission) {
        this._viewContainer.createEmbeddedView(this._templateRef);
        this._buttonTooltipService.updateDisabledTooltip(true);
      } else {
        this._disableState("You don't have permission");
      }
    })
  );

  private _permission: Nullable<string> = null;
  private _isSuccessPermission: boolean = false;

  @Input({ required: true, alias: 'hasPermission' })
  public set permission(value: Nullable<string>) {
    this._permission = value;
  }

  public ngOnInit(): void {
    combineLatest([this._permission$, this._viewDisabled$]).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
  }

  private _disableState(text: string): void {
    const viewRootElement: Nullable<HTMLElement> = this._findViewRootElement();
    const buttonElement: Nullable<HTMLElement> = this._findButtonElement(viewRootElement);
    if (!viewRootElement || !buttonElement) {
      return;
    }
    viewRootElement.setAttribute('class', 'cursor-not-allowed');
    this._renderer.setProperty(buttonElement, 'disabled', true);
    this._buttonTooltipService.updateViewerTooltip(text);
    this._buttonTooltipService.updateDisabledTooltip(false);
  }

  private _enableState(): void {
    const viewRootElement: Nullable<HTMLElement> = this._findViewRootElement();
    const buttonElement: Nullable<HTMLElement> = this._findButtonElement(viewRootElement);
    if (!viewRootElement || !buttonElement) {
      return;
    }
    viewRootElement.removeAttribute('cursor-not-allowed');
    this._renderer.setProperty(buttonElement, 'disabled', false);
    this._buttonTooltipService.updateDisabledTooltip(true);
  }

  private _findViewRootElement(): Nullable<HTMLElement> {
    return this._viewContainer.createEmbeddedView(this._templateRef).rootNodes[0];
  }

  private _findButtonElement(viewRootElement: Nullable<HTMLElement>): Nullable<HTMLElement> {
    if (!viewRootElement) {
      return null;
    }
    return viewRootElement.getElementsByTagName('button')[0];
  }
}
