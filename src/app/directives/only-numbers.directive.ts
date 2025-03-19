import {Directive, HostListener} from '@angular/core';

@Directive({selector: '[onlyNumbers]', standalone: true})
export class onlyNumbersDirective {
  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '');
  }
}
