import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { ChampionshipPage } from '../championship/championship';

/*
  Generated class for the ChampionshipTypePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/championship-type/championship-type.html',
  providers: [PptbService]
})
export class ChampionshipTypePage {
  public chamTypeSegment: string = 'info';
  public chamType: any = {};
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
      this.chamType = data.data;
    });
  }

  showChampionship(champ) {
    this.navCtrl.push(ChampionshipPage, {path: champ.path});
  }

  openWebSite(url) {
    InAppBrowser.open(url, '_system', 'location=yes');
  }

}
