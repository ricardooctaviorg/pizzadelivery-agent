import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../commons/services/util.service';
import { TypeFailCatalog } from '../../commons/interfaces/type-fail-catalog';
import { ModalController } from '@ionic/angular';
import { Delivery } from '../../commons/interfaces/delivery';
import { StorageService } from '../../commons/services/storage.service';
import { DeliveryAgentService } from '../../services/delivery-agent.service';

@Component({
  selector: 'app-modal-typing-fail',
  templateUrl: './modal-typing-fail.page.html',
  styleUrls: ['./modal-typing-fail.page.scss'],
})
export class ModalTypingFailPage implements OnInit {

  typesFailslDelivery   : TypeFailCatalog[] = new Array();
  success               : boolean = false;
  delivery              : Delivery;
  deliveryUpdated       : Delivery;

  @Input() deliveryId   : string;

  constructor(private utilService       : UtilService
    , private deliveryAgentService      : DeliveryAgentService
    , public modalController            : ModalController
    , private storageService            : StorageService) { }

  ngOnInit() {
    this.utilService.getTypeFailsDelivery().subscribe(
      data => 
        this.typesFailslDelivery = data as TypeFailCatalog[]
    );
  }

  dismissModalFail() {
    this.modalController.dismiss({
      'dismissed'               : true
      , 'success'               : this.success
      , 'deliveryUpdated'  : this.deliveryUpdated
    });
  }

  typingFailDelivery(typefail: TypeFailCatalog, deliveryId: string) {
    this.delivery = this.storageService.getDeliveryByDeliveryId(deliveryId);
    this.delivery.typeFailId = typefail.typeFailId;
    this.deliveryAgentService.updateDelivery(this.delivery).subscribe(
      data => {
        this.success = true;
        this.deliveryUpdated = data.delivery as Delivery;
        this.dismissModalFail();
      }, err => {
      }
    );

  }

}
