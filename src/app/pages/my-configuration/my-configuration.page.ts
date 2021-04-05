import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { UserDelivery } from '../../commons/interfaces/user-delivery';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SecurityService } from '../../services/security.service';
import { AvatarCatalog } from '../../commons/interfaces/avatar-catalog';
import { UtilService } from '../../commons/services/util.service';

const SUCCESS_COLOR_TRUE          = "success";
const SUCCESS_COLOR_FALSE         = "danger";

const AGENTUPDATE_SUCCESS         = "¡ Actualización correcta !";
const AGENTUPDATE_FAIL            = "No se puedo actulizar";
const AGENTUPDATE_REQUIRED        = "Favor de completar los datos solicitados";

@Component({
  selector: 'app-my-configuration',
  templateUrl: './my-configuration.page.html',
  styleUrls: ['./my-configuration.page.scss'],
})
export class MyConfigurationPage implements OnInit {

  darkModeSystem      : boolean = true;
  darkMode            : boolean = true;
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

  constructor(private storageService  : StorageService
    , private securityService         : SecurityService
    , private utilService             : UtilService
    , public toastController          : ToastController) { }

  async ngOnInit() {
    await this.consumeGetAvatarCatalog();
    this.agentDeliveryCurrent = this.securityService.getAgentDeliveryCurrent();
    this.selectAvatarBySource(this.agentDeliveryCurrent.avatar);
    console.log(this.agentDeliveryCurrent);
    if(this.storageService.getDarkTheme()== 'F')
      this.darkMode = false;
    else if(this.storageService.getDarkTheme() == 'T')
      this.darkMode = true;
      
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(!prefersDark.matches)
      this.darkModeSystem = false;
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

  async agentUpdate(formAgentUpdate: NgForm){

    if(formAgentUpdate.invalid)
      this.showAgentUpdateStatus(AGENTUPDATE_REQUIRED, SUCCESS_COLOR_FALSE);

      const updateStatus = await this.securityService.updateAgentDelivery(this.agentDeliveryCurrent);

      if( updateStatus )
        this.showAgentUpdateStatus(AGENTUPDATE_SUCCESS, SUCCESS_COLOR_TRUE);
      else
        this.showAgentUpdateStatus(AGENTUPDATE_FAIL, SUCCESS_COLOR_FALSE);
        
  }

  async showAgentUpdateStatus(notice: string, success: string) {
    const toast = await this.toastController.create({
      message: notice
      , duration: 3000
      , color: success
    });
    toast.present();
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
    this.avatartCatalogList.forEach(
      av => {
        av.selected = false;
        if( av.avatarUrl === avatarSrc)
          av.selected = true;
      });
  }
}
