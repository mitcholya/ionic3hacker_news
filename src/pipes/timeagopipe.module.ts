import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './TimeAgoPipe';

@NgModule({
  declarations: [
    [TimeAgoPipe],
  ],
  exports: [
    [TimeAgoPipe]
  ]
})
export class TimeAgoPipeModule {}
