import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PptbService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PptbService {
  private urlBase: string;
  private cache: any = {};

  constructor(private http: Http) {
    // this.urlBase = 'http://www.placarpaintball.com.br';
    this.urlBase = 'http://localhost:3000';
  }


  /** Build API URL with path */
  buildUrl(path: string): string {
    return this.urlBase + path;
  }

  getCache(path: string) {
    if (this.cache[path]) {
      return this.cache[path];
    }

    return false;
  }

  setCache(path: string, data: any): void {
    this.cache[path] = data;
  }

  defaultRequest(path, force = false) {
    if (!force && this.getCache(path)) {
      // already loaded data
      return Promise.resolve(this.getCache(path));
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(this.buildUrl(path))
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.setCache(path, data);
          console.log(path, data);
          resolve(data);
        });
    });
  }

  /** Lista com todos os tipos de campeonato */
  loadCampeonatos() {
    return this.defaultRequest('/campeonatos.json');
  }

  /** Dados de um tipo de campeonato */
  loadByPath(path: string, force = false) {
    return this.defaultRequest(path, force);
  }

}
