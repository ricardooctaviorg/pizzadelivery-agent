import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../commons/services/util.service';
import { TypeFailCatalog } from '../../commons/interfaces/type-fail-catalog';
import { ModalController } from '@ionic/angular';
import { PizzaDelivery } from '../../commons/interfaces/pizza-delivery';
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
  pizzaDelivery         : PizzaDelivery;
  pizzaDeliveryUpdated  : PizzaDelivery;

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
      , 'pizzaDeliveryUpdated'  : this.pizzaDeliveryUpdated
    });
  }

  typingFailDelivery(typefail: TypeFailCatalog, deliveryId: string) {
    this.pizzaDelivery = this.storageService.getPizzaDeliveryByDeliveryId(deliveryId);
    this.pizzaDelivery.typeFailId = typefail.typeFailId;
    this.deliveryAgentService.updateDelivery(this.pizzaDelivery).subscribe(
      data => {
        this.success = true;
        this.pizzaDeliveryUpdated = data.delivery as PizzaDelivery;
        console.log("this.pizzaDeliveryUpdated",this.pizzaDeliveryUpdated);
        this.utilService.showAssignTypeFail(1);
        this.dismissModalFail();
      }, err => {
        this.utilService.showAssignTypeFail(0);
      }
    );

  }

}
