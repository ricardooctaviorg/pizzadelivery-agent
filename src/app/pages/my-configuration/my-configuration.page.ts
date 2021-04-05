import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { UserDelivery } from '../../commons/interfaces/user-delivery';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SecurityService } from '../../services/security.service';

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

  darkModeSystem:boolean = true;
  darkMode:boolean = true;

  agentDeliveryCurrent: UserDelivery={
    name: ""
    , phone: ""
    , avatar: ""
    , password: ""
  }

  constructor(private storageService: StorageService
    , private securityService: SecurityService
    , public toastController: ToastController) { }

  ngOnInit() {
    this.agentDeliveryCurrent = this.securityService.getAgentDeliveryCurrent();
    if(this.storageService.getDarkTheme()== 'F')
      this.darkMode = false;
    else if(this.storageService.getDarkTheme() == 'T')
      this.darkMode = true;
      
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if(!prefersDark.matches)
      this.darkModeSystem = false;
  }

  switch(){
    console.log("switch",this.darkMode);
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
}
