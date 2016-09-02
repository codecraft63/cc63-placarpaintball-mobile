import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { ModalAllStagesPage } from './all_stages';

/*
  Generated class for the StagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/stage/stage.html',
  providers: [PptbService]
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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pptb: PptbService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
    let path = navParams.get('path');
    this.isAndroid = platform.is('android');

    this.loadData(path);
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
}
