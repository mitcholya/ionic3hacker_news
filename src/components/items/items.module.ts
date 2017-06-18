 import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { ItemsComponent } from './items';
 import { ItemComponentModule} from '../item/item.module';

 @NgModule({
   declarations: [
     [ItemsComponent],
   ],
   imports: [
    ItemComponentModule,
    IonicPageModule.forChild(ItemsComponent),
   ],
   exports: [
     [ItemsComponent]
   ]
 })
 export class ItemsComponentModule {}
