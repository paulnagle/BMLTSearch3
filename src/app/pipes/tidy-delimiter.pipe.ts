import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tidyDelimiter'
})
export class TidyDelimiterPipe implements PipeTransform {

  transform(value: string, ...args) {
    return value.replace('#@-@#', ' : ');;
  }

}
