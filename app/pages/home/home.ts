import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { ChampionshipsPage } from '../championships/championships';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  favorites: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
  }

  openChampionships() {
    this.navCtrl.push(ChampionshipsPage);
  }
}
