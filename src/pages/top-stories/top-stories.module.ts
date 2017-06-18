import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopStoriesPage } from './top-stories';
import { ItemsComponentModule } from '../../components/items/items.module';
import { ItemComponentModule } from '../../components/item/item.module';

@NgModule({
  declarations: [
    [TopStoriesPage],
  ],
  imports: [
    ItemsComponentModule,
    ItemComponentModule,
    IonicPageModule.forChild(TopStoriesPage),
  ],
  exports: [
    [TopStoriesPage]
  ]
})
export class TopStoriesPageModule {}
