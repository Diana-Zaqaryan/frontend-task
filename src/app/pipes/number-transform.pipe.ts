import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform'
})
export class NumberTransformPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length <= 4) return value;

    return value.slice(0, 4) + '****' + value.slice(4);
  }

}
