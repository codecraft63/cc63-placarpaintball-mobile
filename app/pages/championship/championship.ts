import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { FavoriteService } from '../../providers/favorite-service/favorite-service';
import { StagePage } from '../stage/stage';

/*
  Generated class for the ChampionshipPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/championship/championship.html',
  providers: [PptbService, FavoriteService]
})
export class ChampionshipPage {
  public champSegment: string = 'info';
  public champ: any = {};
  public isAndroid: boolean = false;
  public fav: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pptb: PptbService,
    private platform: Platform,
    private favService: FavoriteService
  ) {
    let path = navParams.get('path');
    this.isAndroid = platform.is('android');

    this.pptb.loadByPath(path)
    .then(data => {
      this.champ = data.data;
      this.favService.get('championship', this.champ.id).then(data => {
        this.fav = data;
      });
    });
  }

  showStage(stage) {
    this.navCtrl.push(StagePage, {path: stage.path});
  }

  backToChampionshipType() {
    this.navCtrl.pop();
  }

  isFavorited() {
    return this.fav !== false;
  }

  toggleFavorite() {
    if (this.isFavorited()) {
      this.favService.remove(this.fav.id).then(data => {
        this.fav = data;
        console.log(data);
      });
    }
    else {
      var data = {
        id: this.champ.id,
        name: this.champ.name,
        date: this.champ.reference_date,
        type: 'Campeonato',
        params: {path: this.champ.path}
      };
      this.fav = this.favService.add(data, 'championship');
    }
  }
}
