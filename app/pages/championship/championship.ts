import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { StagePage } from '../stage/stage';

/*
  Generated class for the ChampionshipPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/championship/championship.html',
  providers: [PptbService]
})
export class ChampionshipPage {
  public champSegment: string = 'info';
  public champ: any = {};
  public isAndroid: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pptb: PptbService,
    private platform: Platform
  ) {
    let path = navParams.get('path');
    this.isAndroid = platform.is('android');

    this.pptb.loadByPath(path)
    .then(data => {
      this.champ = data.data;
    });
  }

  showStage(stage) {
    this.navCtrl.push(StagePage, {path: stage.path});
  }

  backToChampionshipType() {
    this.navCtrl.pop();
  }

}
