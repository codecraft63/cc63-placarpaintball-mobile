import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';

/*
  Generated class for the FavoriteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FavoriteService {
  private storage: any;
  private fav_key: string = 'favoritos';

  constructor() {
    this.storage = new Storage(LocalStorage);
  }

  getAll() {
    return this.storage.getJson(this.fav_key);
  }

  add(item: any, type: string) {
    var all = this.getAll();

    var row = {type: type, data: item, time: new Date()};
    all.push(row);

    this.storage.setJson(this.fav_key, all);

    return row;
  }

  isFavorited(type: string, search_key: string, key: any) {
    var all = this.getAll();
  }

}

