import { Component, Input } from '@angular/core';
import { Items } from '../../model/Items';

/**
 * Generated class for the ItemsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'items',
  templateUrl: 'items.html'
})
export class ItemsComponent {

  @Input() items: Items;
  text: string;

  constructor() {
    console.log('Hello ItemsComponent Component');
    this.text = 'Hello World';
  }

}
