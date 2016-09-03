import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FavoriteService } from '../../providers/favorite-service/favorite-service';

import { ChampionshipPage } from '../championship/championship';
import { ChampionshipsPage } from '../championships/championships';
import { StagePage } from '../stage/stage';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [FavoriteService]
})
export class HomePage {
  favorites: any = [];
  private favPages = {
    'championship': ChampionshipPage,
    'stage': StagePage
  };

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private favService: FavoriteService
  ) {
    // this.favService.storage.clear();

    this.favService.getAll().then(data => {
      this.favorites = data;
      console.log(this.favorites);
    });
  }

  openChampionships() {
    this.navCtrl.push(ChampionshipsPage);
  }

  openFavorite(fav) {
    this.navCtrl.push(this.favPages[fav.type], fav.data.params);
  }
}
