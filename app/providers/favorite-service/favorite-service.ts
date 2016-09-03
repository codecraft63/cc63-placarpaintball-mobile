import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular';

/*
  Generated class for the FavoriteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FavoriteService {
  public storage: any;
  private fav_key: string = 'favoritos';

  constructor() {
    this.storage = new Storage(LocalStorage);
  }

  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  private fetchFromObject(obj: any, prop: string){
      //property not found
      if(typeof obj === 'undefined') return false;
      
      //index of next property split
      var _index = prop.indexOf('.')

      //property split found; recursive call
      if(_index > -1){
          //get object at property (before split), pass on remainder
          return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
      }
      
      //no split; get property
      return obj[prop];
  }

  private find(data, id) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        return data[i];
      }
    }
    return null;
  }

  getAll() {
    return this.storage.getJson(this.fav_key);
  }

  getByType(type: string) {
    var dis = this;
    return new Promise(function (resolve, reject) {
      try {
        dis.getAll().then(function(all: Array<any>) {
          if (all === null) {
            resolve([]);
            return void(0);
          }

          var newList = [];
          for (var i = 0; i < all.length; i++) {
            if (all[i].type != type) {
              continue;
            }

            newList.push(all[i]);
          }

          resolve(newList);
        });
      }
      catch (e) {
        reject(e);
      }
    });
  }

  add(item: any, type: string) {
    var dis = this;
    return new Promise(function(resolve, reject) {
      dis.getAll().then(function(all: Array<any>) {
        if (all === null) {
          all = [];
        }
        
        var id = type+'__'+item.id,
            check = dis.find(all, id);

        if (dis.find(all, id) != null) {
          resolve(check);
          return void(0);
        }

        var row = {id: id, type: type, data: item, time: new Date()};
        all.push(row);

        dis.storage.setJson(dis.fav_key, all);
        console.log('Adicionou aos favoritos ', row);

        resolve(row);
      });
    });
  }

  remove(id: string) {
    var dis = this;
    return new Promise(function(resolve, reject) {
      dis.getAll().then(function(all: Array<any>) {
        if (all === null) {
          all = [];
        }

        for (var i = 0; i < all.length; i++) {
          if (all[i].id == id) {
            all.splice(i, 1);
            dis.storage.setJson(dis.fav_key, all);
            console.log('Removeu '+id+' dos favoritos');
            resolve(true);
            return void(0);
          }
        }

        resolve(false);
      });
    });
  }

  get(type: string, id: any) {
    var dis = this;
    id = type+ '__'+ id;
    return new Promise(function (resolve, reject) {
      dis.getByType(type).then(function(all: Array<any>) {
        if (all === null) {
          all = [];
        }

        var row = dis.find(all, id);

        if (row === null) {
          resolve(false);
          return void(0);
        }

        resolve(row);
      });
    });
  }

}

