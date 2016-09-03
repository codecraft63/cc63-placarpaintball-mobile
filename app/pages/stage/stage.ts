import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { FavoriteService } from '../../providers/favorite-service/favorite-service';
import { ModalAllStagesPage } from './all_stages';

/*
  Generated class for the StagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/stage/stage.html',
  providers: [PptbService, FavoriteService]
})
export class StagePage {
  private current_path: string;
  public stageSegment: string = 'info';
  public stage: any = {
    championship: {},
    venue: {},
    groups: {}
  };
  public isAndroid: boolean = false;
  public fav: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pptb: PptbService,
    private platform: Platform,
    private modalCtrl: ModalController,
    private favService: FavoriteService
  ) {
    let path = navParams.get('path');
    this.isAndroid = platform.is('android');

    this.loadData(path).then(data => {
      this.favService.get('stage', this.stage.id).then(data => {
        this.fav = data;
      });
    });
  }

  loadData(path:string, force = false) {
    return this.pptb.loadByPath(path, force)
      .then(data => {
        this.current_path = path;
        this.stage = data.data;
      });
  }

  openAllStagesModal() {
    let modal = this.modalCtrl.create(ModalAllStagesPage, {stages: this.stage.all_stages});
    modal.onDidDismiss(data => {
      if (data) {
        this.loadData(data.path);
      }
    });
    modal.present();
  }

  backToChampionship() {
    this.navCtrl.pop();
  }

  doRefresh(refresher) {
    this.loadData(this.current_path, true).then(data => {refresher.complete();})
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
        id: this.stage.id,
        name: this.stage.name,
        date: this.stage.event_on,
        type: 'Etapa',
        params: {path: this.stage.path}
      };
      this.fav = this.favService.add(data, 'stage');
    }
  }
}
