import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appSecondTrans'
})
export class SecondTrans implements PipeTransform {
    transform(seconds: number): string {
      let newFormat = '';
      newFormat += Math.floor(seconds/60) + ' minutes ';
      newFormat += seconds%60 + ' seconds';

      return newFormat;
    }
}
