import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '@app/core';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *appHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
  selector: '[appHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
  private authorities: string[];

  @Input()
  set appHasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [<string>value] : <string[]>value;
    this.updateView();
    this.authService.getAuthenticationState().subscribe((state: boolean) => this.updateView());
  }

  constructor(
    private authService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this.authService.hasAnyAuthority(this.authorities)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
