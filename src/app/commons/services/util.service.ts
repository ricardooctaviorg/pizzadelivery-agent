import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MenuOpt } from '../interfaces/menu-opt';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { StatusDelivery } from '../enums/status-delivery.enum';
import { ToastController } from '@ionic/angular';
import { StatusDeliveryIcon } from '../enums/status-delivery-icon.enum';
import { CommonDeliveryIcon } from '../enums/common-delivery-icon.enum';

const PATH_MAINMENU_OPTIONS       = "/assets/json/mainMenu.json";

const TOAST_ICON_SUCCESS_TRUE     = CommonDeliveryIcon.SUCCESS_TRUE.toString();
const TOAST_ICON_SUCCESS_FALSE    = CommonDeliveryIcon.SUCCESS_FASE.toString();

const TOAST_ICON_ONWAY            = StatusDeliveryIcon.DELIVERY_ONWAY.toString();
const TOAST_ICON_COMPLETE         = StatusDeliveryIcon.DELIVERY_COMPLETE.toString();
const TOAST_ICON_FAIL             = StatusDeliveryIcon.DELIVERY_FAIL.toString();

const TOAST_DURATION              = 5000;
const TOAST_TRANSLUCENT           = false;
const TOAST_POSITION              = "bottom";
const TOAST_COLOR_SUCCESS_TRUE    = "tertiary";
const TOAST_COLOR_SUCCESS_FALSE   = "danger";
const TOAST_KEYBOARD_CLOSE        = false;

const GATEWAY_VALUE         = environment.gateway;
const AVATAR_RESOURCE       = environment.avatarResource;
const TYPEFAIL_RESOURCE     = environment.typeFailResource;

const GETAVATARS = GATEWAY_VALUE
  + AVATAR_RESOURCE
  + "/getByType";

const GETTYPEFAILS = GATEWAY_VALUE
  + TYPEFAIL_RESOURCE;

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

  public getTypeFailsDelivery(): Observable<any> {
    return this.httpClient.get<any>(`${GETTYPEFAILS}`);
  }

  async showAgentRegisterStatus(notice: string, success: boolean) {

    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success){
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;
      iconToast = TOAST_ICON_SUCCESS_TRUE;
    }

    const toast = await this.toastController.create({
      message           : notice
      , duration        : TOAST_DURATION
      , color           : typeAlert
      , keyboardClose   : TOAST_KEYBOARD_CLOSE
      , position        : TOAST_POSITION
      , translucent     : TOAST_TRANSLUCENT
      , buttons         : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async showAgentUpdateStatus(notice: string, success: boolean) {
    
    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success){
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;
      iconToast = TOAST_ICON_SUCCESS_TRUE;
    }

    const toast = await this.toastController.create({
      message           : notice
      , duration        : TOAST_DURATION
      , color           : typeAlert
      , keyboardClose   : TOAST_KEYBOARD_CLOSE
      , position        : TOAST_POSITION
      , translucent     : TOAST_TRANSLUCENT
      , buttons         : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    toast.present();

  }

  async showStatus(status: string, success: boolean) {

    var messageCurrent  : string = "";
    var typeAlert       : string = TOAST_COLOR_SUCCESS_FALSE;
    var iconToast       : string = TOAST_ICON_SUCCESS_FALSE;

    if (success)
      typeAlert = TOAST_COLOR_SUCCESS_TRUE;

    switch (status) {
      case StatusDelivery.DELIVERY_ONWAY.toString():
        if (success){
          messageCurrent  = "Haz iniciado la entrega.";
          iconToast       = TOAST_ICON_ONWAY;
        }
        else
          messageCurrent = "Error de actualización";
        break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        if (success){
          messageCurrent  = "Haz completado la entrega.";
          iconToast       = TOAST_ICON_COMPLETE;
        }  
        else
          messageCurrent = "Error de actualización";
        break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        if (success){
          messageCurrent  = "No se realizo la entrega.";
          iconToast       = TOAST_ICON_FAIL;
        }
        else
          messageCurrent = "Error de actualización";
        break;
    }
    const toast = await this.toastController.create({
      message         : messageCurrent
      , duration      : TOAST_DURATION
      , color         : typeAlert
      , keyboardClose : TOAST_KEYBOARD_CLOSE
      , position      : TOAST_POSITION
      , translucent   : TOAST_TRANSLUCENT
      , buttons       : [
        {
          side: 'start',
          icon: iconToast,
        },{
          side: 'end',
          text: 'CERRAR',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ]
    });
    await toast.present();
  }
}
