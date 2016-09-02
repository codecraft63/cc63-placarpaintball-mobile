import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, AdMob } from 'ionic-native';

import { PptbService } from './providers/pptb-service/pptb-service';
import { HomePage } from './pages/home/home';
import { ChampionshipsPage } from './pages/championships/championships';

// declare var AdMob: any;

@Component({
  templateUrl: 'build/app.html',
  providers: [PptbService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  admobId: any;
  
  constructor(private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.createBanner();
      this.showBanner();

      //this.createInterstitial();
      //setTimeout(() => this.showInterstitial(), 10000);
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Campeonatos', component: ChampionshipsPage }
    ];

    if (platform.is('android')) {
      this.admobId = {
        banner: 'ca-app-pub-1246741890384647/6978729061',
        interstitial: 'ca-app-pub-1246741890384647/3024377462'
      };
    } else if (platform.is('ios')) {
      this.admobId = {
        banner: 'ca-app-pub-1246741890384647/4141183865',
        interstitial: 'ca-app-pub-xxx/yyy'
      };
    }
  } 

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.openPage2(page.component);
  }

  openPage2(component) {
    if (component instanceof HomePage) {
      this.nav.setRoot(component);
    } else {
      this.nav.push(component);
    }
  }

  createBanner() {
    if(AdMob) {
      AdMob.createBanner({
        adId: this.admobId.banner,
        autoShow: true,
        isTesting: true,
        position: 8
      });
    }
  }

  createInterstitial() {
    if(AdMob) {
      AdMob.prepareInterstitial({
        adId: this.admobId.interstitial,
        autoShow: false,
        isTesting: true
      });
    }
  }

  showInterstitial() {
    console.log('Solicitando banner interstitial');
    if(AdMob) {
      AdMob.showInterstitial();
    }

    setTimeout(() => this.showInterstitial(), 2*60*1000);
  }

  showBanner() {
    if(AdMob) {
      // AdMob.showBanner(8);
    }
  }
}

ionicBootstrap(MyApp);
