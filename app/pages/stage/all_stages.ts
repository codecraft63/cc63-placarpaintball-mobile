import { Component } from '@angular/core';
import { ViewController, NavParams, Platform } from 'ionic-angular';
import { StagePage } from './stage';
import { ArrayFilterPipe } from "../../pipes/array-filter.pipe";

@Component({
  templateUrl: 'build/pages/stage/all_stages_modal.html',
  pipes: [ArrayFilterPipe]
})
export class ModalAllStagesPage {
  stages;

  constructor(
    private platform: Platform,
    private params: NavParams,
    private viewCtrl: ViewController
  ) {
    this.stages = this.params.get('stages');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showStage(stage) {
    this.viewCtrl.dismiss({path: stage.path});
  }

  isVisible(stage) {
    return stage.status != 'configuring';
  }
}
