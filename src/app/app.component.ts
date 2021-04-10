import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './commons/services/util.service';
import { Observable } from 'rxjs';
import { MenuOpt } from './commons/interfaces/menu-opt';
import { InfoAgentService } from './commons/services/info-agent.service';
import { StorageService } from './commons/services/storage.service';
import { SecurityService } from './services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit  {

  menuOpts  :Observable<MenuOpt[]>;
  nameAgent : string = "";

  agentInfoCurrent = {
    name: ""
    , avatar: ""
  }

  constructor(
    private platform: Platform
    , private splashScreen: SplashScreen
    , private statusBar: StatusBar
    , private utilService:UtilService
    , private infoAgentService: InfoAgentService
    , private securityService: SecurityService
    , private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
     this.menuOpts = this.utilService.getMainMunuOptions();
      if(this.storageService.getDarkTheme() === 'T' 
      || this.storageService.getDarkTheme() === ''
      || this.storageService.getDarkTheme() === null
      || this.storageService.getDarkTheme() === undefined){
        document.body.classList.add('dark');
        this.storageService.updateDarkTheme('T');
      }
      else if(this.storageService.getDarkTheme() == 'F'){
        document.body.classList.remove('dark');
        this.storageService.updateDarkTheme('F');
      }
  }

  ngOnInit() {
    this.infoAgentService.infoMenu.subscribe(
      agentInfo => {
        this.agentInfoCurrent = agentInfo;
      }
    );
  }

  logOut(){
    this.securityService.logOut();
  }
}
