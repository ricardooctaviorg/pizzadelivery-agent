import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDelivery } from '../../commons/interfaces/user-delivery';
import { NgForm } from '@angular/forms';
import { ToastController, IonSlides } from '@ionic/angular';
import { SecurityService } from '../../services/security.service';
import { AvatarCatalog } from '../../commons/interfaces/avatar-catalog';
import { UtilService } from '../../commons/services/util.service';
import { StorageService } from '../../commons/services/storage.service';

const SUCCESS_TRUE                = true;
const SUCCESS_FALSE               = false;

const AGENTUPDATE_SUCCESS         = "¡ Actualización correcta !";
const AGENTUPDATE_FAIL            = "No se puedo actulizar";
const AGENTUPDATE_REQUIRED        = "Favor de completar los datos solicitados";

@Component({
  selector: 'app-my-configuration',
  templateUrl: './my-configuration.page.html',
  styleUrls: ['./my-configuration.page.scss'],
})
export class MyConfigurationPage implements OnInit {

  //darkModeSystem      : boolean = true;
  darkMode            : boolean;
  avatartCatalogList  : AvatarCatalog[] = new Array();
  avatarIdCurrent     : string = "";

  agentDeliveryCurrent: UserDelivery={
    name: ""
    , phone: ""
    , avatar: ""
    , password: ""
  }

  avatarSlide = {
    slidesPerView: 4
    , centeredSlides: true
  };

  @ViewChild('aSlides') aSlides: IonSlides;

  constructor(private storageService  : StorageService
    , private securityService         : SecurityService
    , private utilService             : UtilService
    , public toastController          : ToastController) { }

  async ngOnInit() {
    await this.consumeGetAvatarCatalog();
    this.agentDeliveryCurrent = this.securityService.getAgentDeliveryCurrent();
    this.selectAvatarBySource(this.agentDeliveryCurrent.avatar);
    if(this.storageService.getDarkTheme()== 'F'){
      this.darkMode = false;
      document.body.classList.remove('dark');
    }else if(this.storageService.getDarkTheme() == 'T'){
      this.darkMode = true;
      document.body.classList.add('dark');
    }
   
    /*const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(!prefersDark.matches)
      this.darkModeSystem = false;*/
  }

  consumeGetAvatarCatalog() {
    return new Promise(
      resolve => {
        this.utilService.getAvatarCatalog().subscribe(
          data => {
            this.avatartCatalogList = data as AvatarCatalog[];
            resolve(true);
          }
        );
      }
    );

  }

  switch(){
    if(!this.darkMode){
      document.body.classList.remove('dark');
      this.storageService.updateDarkTheme('F');
    }else if(this.darkMode){
      document.body.classList.add('dark');
      this.storageService.updateDarkTheme('T');
    }

  }

  async agentUpdate(formAgentUpdate: NgForm) {

    if (formAgentUpdate.invalid)
      this.utilService.showAgentUpdateStatus(AGENTUPDATE_REQUIRED, SUCCESS_FALSE);
    else {
      const updateStatus = await this.securityService.updateAgentDelivery(this.agentDeliveryCurrent);
      if (updateStatus)
        this.utilService.showAgentUpdateStatus(AGENTUPDATE_SUCCESS, SUCCESS_TRUE);
      else
        this.utilService.showAgentUpdateStatus(AGENTUPDATE_FAIL, SUCCESS_FALSE);
    }
  }

  selectAvatar(avatar: AvatarCatalog) {
    this.avatartCatalogList.forEach(
      av => {
        av.selected = false;
      });
    avatar.selected = true;
    this.agentDeliveryCurrent.avatar = avatar.avatarUrl;
    this.avatarIdCurrent = avatar.avatarId;
  }

  selectAvatarBySource(avatarSrc: string) {
    let a = 0;
    this.avatartCatalogList.forEach(
      av => {
        a++;
        av.selected = false;
        if( av.avatarUrl === avatarSrc){
          av.selected = true;
          this.aSlides.slideTo(a-1, 1500);
          this.agentDeliveryCurrent.avatar = av.avatarUrl;
          this.avatarIdCurrent = av.avatarId;
        } 
      });
  }
}
