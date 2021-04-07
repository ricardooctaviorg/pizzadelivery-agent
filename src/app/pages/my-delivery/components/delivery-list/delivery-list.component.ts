import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IonRefresher } from '@ionic/angular';
import { DeliveryAgentService } from '../../../../services/delivery-agent.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { StorageService } from '../../../../commons/services/storage.service';
import { StatusDelivery } from '../../../../commons/enums/status-delivery.enum';
import { UtilService } from '../../../../commons/services/util.service';
import { CountStatusService } from '../../../../commons/services/count-status.service';
import { GroupStatusAgent } from '../../../../commons/enums/group-status-agent.enum';
import { ModalTypingFailPage } from '../../../modal-typing-fail/modal-typing-fail.page';

const PAGE_SIZE = 10;
const ORDERDATE_DESC = "orderDate,-1";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {

  pizzaDeliveriesCurrent  : PizzaDelivery[] = new Array();
  pizzaDeliveries         : PizzaDelivery[] = new Array();
  pizzaDelivery           : PizzaDelivery;
  dataResponse            : any;
  pageData                : any;
  pageCurrent             : number  = 1;
  statusDelivery          : string[];
  agentIdCurrent          : string;
  countPendingOrders      : number  = 0;
  countFinalyOrders       : number  = 0;
  showStatusTitle         : string  = "";
  emptyGroup              : string  = "";

  today   = new Date();
  dd      = String(this.today.getDate()).padStart(2, '0');;
  mm      = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy    = String(this.today.getFullYear());

  todayStringInit: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 0, 0, 0);
  todayStringEnd: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 23, 59, 59);

  @ViewChild(IonInfiniteScroll) infiniteScroll  : IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher         : IonRefresher;

  constructor(private deliveryAgentService  : DeliveryAgentService
    , private utilService                   : UtilService
    , private route                         : ActivatedRoute
    , private storageService                : StorageService
    , private countStatusService            : CountStatusService
    , public modalController                : ModalController) { }

  async ngOnInit() {
    await this.loadUserId();
    this.route.paramMap.subscribe(
      params => {
        const statusDelivery: string = String(params.get("statusDelivery"));
        this.statusDelivery = statusDelivery.split(",");
        this.cleanDeliveries();
        this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      }
    );
  }

  async loadUserId() {
    this.agentIdCurrent = await this.storageService.getUserId() || null;
  }

  private consumeData(agentId: string
    , statusId: string[]
    , startDate: Date
    , endDate: Date
    , page: string
    , size: string
    , sort: string): void {
    this.deliveryAgentService.findByAgentId(agentId, statusId, startDate, endDate, page, size, sort)
      .subscribe(
        data => 
        {
          if (data.success) {
            this.pizzaDeliveriesCurrent = data.deliveries as PizzaDelivery[];
            this.pizzaDeliveries.push(... this.pizzaDeliveriesCurrent);
            this.storageService.setPizzaDeliverys(this.pizzaDeliveries);
            this.pageData = data.page;

            if( statusId.includes(StatusDelivery.DELIVERY_ASSIGNED.toString()) || statusId.includes(StatusDelivery.DELIVERY_ONWAY.toString()) ){
              this.showStatusTitle  = GroupStatusAgent.PENDING_ORDERS.toString();
              if( this.pizzaDeliveries.length == 0 )
                this.emptyGroup = 'a';
            }  
            else if( statusId.includes(StatusDelivery.DELIVERY_COMPLETE.toString()) || statusId.includes(StatusDelivery.DELIVERY_FAIL.toString()) ){
              this.showStatusTitle  = GroupStatusAgent.FINISH_ORDERS.toString();
              if( this.pizzaDeliveries.length == 0 )
                this.emptyGroup = 'b';
            }

            this.countPendingOrders = 0;
            this.countFinalyOrders  = 0;

            for (let a of this.pizzaDeliveries)
              if( a.status.statusId == StatusDelivery.DELIVERY_ASSIGNED.toString() || a.status.statusId == StatusDelivery.DELIVERY_ONWAY.toString() )
                this.countPendingOrders ++
              else if( a.status.statusId == StatusDelivery.DELIVERY_COMPLETE.toString() || a.status.statusId == StatusDelivery.DELIVERY_FAIL.toString() )
                this.countFinalyOrders ++;
            
            this.countStatusService.sendCountStatus(String(this.countPendingOrders) + "," + String(this.countFinalyOrders) + "," + this.showStatusTitle);
          }
        }
      );
  }

  loadData(event) {
    setTimeout(() => {
      this.pageCurrent++;
      this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.infiniteScroll.complete();
    }, 500);
    
  }

  async doRefresh(event) {
    await this.cleanDeliveries();    
    setTimeout(() => {
      this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.ionRefresher.complete();
    }, 1000);
  }

  async changeDeliveryStatus(deliveryId: string, status: string) {

    if(status == StatusDelivery.DELIVERY_FAIL.toString() ){
      
      const dataOfModal = await this.presentModal(deliveryId);

      if (dataOfModal.data.success) {
        dataOfModal.data.pizzaDeliveryUpdated.status.statusId       = status;
        dataOfModal.data.pizzaDeliveryUpdated.status.statusDelivery = StatusDelivery[status];
        this.deliveryAgentService.updateDelivery(dataOfModal.data.pizzaDeliveryUpdated).subscribe(
          data => {
            this.utilService.showStatus(status, 1);
            this.doRefresh(null);
          }, err => {
            this.utilService.showStatus(status, 0);
          }
        );
      }
    }
    else{
      this.pizzaDelivery = this.storageService.getPizzaDeliveryByDeliveryId(deliveryId);
      this.pizzaDelivery.status.statusId = status;
      this.pizzaDelivery.status.statusDelivery = StatusDelivery[status];
      if(status == StatusDelivery.DELIVERY_COMPLETE.toString() )
        this.pizzaDelivery.deliveryDate = new Date();
      
      this.deliveryAgentService.updateDelivery(this.pizzaDelivery).subscribe(
        data => {
          this.utilService.showStatus(status, 1);
          this.doRefresh(null);
        }, err => {
          this.utilService.showStatus(status, 0);
        }
      );
    }
  }

  async presentModal(deliveryId: string): Promise<any> {
    return new Promise<any>(
      async resolve => {
        const modal = await this.modalController.create({
          component: ModalTypingFailPage
          , cssClass: 'my-custom-class'
          , swipeToClose: true
          , componentProps: {
            'deliveryId': deliveryId
          }
        });
        await modal.present();
        resolve(await modal.onDidDismiss());
      }
    );
  }

  async cleanDeliveries() {
    this.pizzaDeliveries      = [];
    this.countPendingOrders   = 0;
    this.countFinalyOrders    = 0;
    this.pageCurrent          = 1;
    await this.storageService.setPizzaDeliverys(this.pizzaDeliveries);
  }

}

