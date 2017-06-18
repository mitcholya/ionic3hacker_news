import { Component, OnInit, OnDestroy  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subscription } from "rxjs";
import { Items } from '../../model/Items';
import { ItemService } from '../../services/ItemService';

/**
 * Generated class for the TopStoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-top-stories',
  templateUrl: 'top-stories.html',
})
export class TopStoriesPage  implements OnInit, OnDestroy { 

  items: Items;
  subscription: Subscription;
  offset: number = 0;
  limit: number = 10;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemService: ItemService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopStoriesPage');
  }

  ngOnInit(): void {
    this.subscription = this.itemService.get().subscribe(items => this.items = items);
      this.doLoad(true);
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasPrevious(): boolean {
    return this.offset > 0;
  }

  previous(): void {
    if (!this.hasPrevious()) {
      return;
    }
    this.offset -= this.limit;
    this.doLoad(false);
  }

  hasNext(): boolean {
    return this.items != null && (this.offset + this.limit) < this.items.
      total;
  }

  next(): void {
    if (!this.hasNext()) {
      return;
    }
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return this.items != null;
  }

  refresh(): void {
    if (!this.canRefresh()) {
      return;
    }
    this.offset = 0;
    this.doLoad(true);
  }

  doLoad(refresh: boolean): void {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh,
    });
  }

}
