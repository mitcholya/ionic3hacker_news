import { Injectable } from '@angular/core';
import { Observable, Subject  } from 'rxjs';
import { Items } from '../model/Items';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as isEqual from 'lodash.isequal'; 

export interface Query {
 refresh?: boolean;
 offset: number;
 limit: number;
}

@Injectable()
export class ItemService {

  queries: Subject<Query>;

  constructor(public afDB: AngularFireDatabase) { 
    this.queries = new Subject<Query>();
  }

  load(query: Query) {
      this.queries.next(query);
  }

  get(): Observable<Items> {
    const rawItemIds = this.afDB.list('/v0/topstories')
      .map(ids => ids.map(v => v.$value));
    const itemIds = Observable.combineLatest(
      rawItemIds,
      this.queries,
      (ids, query) => ({ ids, query }),
    ).filter(v => v.query.refresh)
      .pluck('ids');
    const selector = ({ offset, limit }, ids) => ({
      offset,
      limit,
      total: ids.length,
      results: ids.slice(offset, offset + limit)
        .map(id => this.afDB.object('/v0/item/' + id))
    });
    return Observable.merge(
      this.queries.combineLatest(itemIds, selector).take(1),
      this.queries.skip(1).withLatestFrom(itemIds, selector)
    );
  }

}

    