import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Delivery } from '../../../../commons/interfaces/delivery';
import { StorageService } from '../../../../commons/services/storage.service';
import { InfoAgentService } from '../../../../commons/services/info-agent.service';

const DELIVERY_LOCATION   = "location";

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.scss'],
})
export class DetailLocationComponent implements OnInit {

  deliveries        : Delivery[] = new Array();
  addressCurrent    : any;
  destination       : string;
  toLat             : string;
  toLng             : string;

  constructor(private storageService  : StorageService
    , private route                   : ActivatedRoute
    , public actionSheetController    : ActionSheetController
    , private infoAgentService        : InfoAgentService) { }

  ngOnInit() {
    this.deliveries =  this.storageService.getDeliveries() as Delivery[];
    this.route.paramMap.subscribe(
      params => {
        let deliveryIdCurrent: string = String(params.get("deliveryId"));
        deliveryIdCurrent = deliveryIdCurrent.replace(',','');
        for(let a of this.deliveries)
          if(a.deliveryId == deliveryIdCurrent)
            this.addressCurrent = a.address;
        this.toLat = this.addressCurrent.lat;
        this.toLng = this.addressCurrent.lng;
        this.destination = this.toLat + ',' + this.toLng;
        this.infoAgentService.sendDetailTypeTltle(DELIVERY_LOCATION);
      }
    );
  }

  onClick(){
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Abrir con:',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Waze',
        icon: '',
        handler: () => {
          window.open("https://waze.com/ul?ll="+this.destination+"&navigate=yes&z=10");
        }
      }, {
        text: 'Google Maps',
        icon: '',
        handler: () => {
          window.open("https://www.google.com/maps/search/?api=1&query="+this.destination)
        }
      }]
    });
    await actionSheet.present();
  }

}
