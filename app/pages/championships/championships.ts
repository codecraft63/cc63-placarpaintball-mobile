import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { PptbService } from '../../providers/pptb-service/pptb-service';
import { ChampionshipTypePage } from '../championship-type/championship-type';

/*
  Generated class for the ChampionshipsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/championships/championships.html',
  providers: [PptbService]
})
export class ChampionshipsPage {
  public campeonatos: any;

  constructor(
    private navCtrl: NavController,
    private pptb: PptbService,
    private viewCtrl: ViewController
  ) {
    this.pptb.loadCampeonatos()
    .then(data => {
      this.campeonatos = data.data;
      console.log(data);
    });
  }

  selectChampionshipType(championshipType: any) {
    console.log(championshipType);

    this.navCtrl.push(ChampionshipTypePage, {path: championshipType.path});
  }
}
