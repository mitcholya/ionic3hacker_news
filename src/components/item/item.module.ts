 import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { ItemComponent } from './item';
 import { TimeAgoPipeModule } from '../../pipes/timeagopipe.module';

 @NgModule({
   declarations: [
     [ItemComponent],
   ],
   imports: [
    TimeAgoPipeModule,
     IonicPageModule.forChild(ItemComponent),
   ],
   exports: [
     [ItemComponent]
   ]
 })
 export class ItemComponentModule {}
