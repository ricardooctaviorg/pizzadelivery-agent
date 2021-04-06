import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MenuOpt } from '../interfaces/menu-opt';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { StatusDelivery } from '../enums/status-delivery.enum';
import { ToastController } from '@ionic/angular';

const PATH_MAINMENU_OPTIONS = "/assets/json/mainMenu.json";

const GATEWAY_VALUE = environment.gateway;

const GETAVATARS = GATEWAY_VALUE
  + '/AvatarCatalog'
  + "/getByType";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private httpClient:HttpClient
    , public toastController        : ToastController) { }

  public getMainMunuOptions(){
    return this.httpClient.get<MenuOpt[]>(PATH_MAINMENU_OPTIONS);
  }

  public getAvatarCatalog(): Observable<any> {
    const params = new HttpParams()
      .set('avatarType', 'agent')

    const httpOptionsX =
    {
      params
    };
    return this.httpClient.get<any>(`${GETAVATARS}`, httpOptionsX);
  }

  async showStatus(status: string, success: number) {

    var messageCurrent: string = "";
    var typeAlert: string = "danger";

    switch (status) {
      case StatusDelivery.DELIVERY_ONWAY.toString():
        if (success)
          messageCurrent = "HAZ INICIADO LA ENTREGA.";
        else
          messageCurrent = "ERROR: NO SE PUEDE ACTULIZAR ESTA ENTREGA.";
        break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        if (success)
          messageCurrent = "HAZ COMPLETADO LA ENTREGA.";
        else
          messageCurrent = "ERROR: NO SE PUEDE ACTULIZAR ESTA ENTREGA";
        break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        if (success)
          messageCurrent = "LA ENTREGA SE HA MARCADO COMO INCOMPLETA.";
        else
          messageCurrent = "ERROR: NO SE PUEDE ACTULIZAR ESTA ENTREGA.";
        break;
    }

    if (success)
      typeAlert = "success";

    const toast = await this.toastController.create({
      message: messageCurrent
      , duration: 3000
      , color: typeAlert
      , keyboardClose: true
      , position: "top"
      , translucent: false
    });
    toast.present();
  }


}
