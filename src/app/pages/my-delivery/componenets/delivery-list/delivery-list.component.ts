import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll, IonRefresher, ToastController } from '@ionic/angular';
import { DeliveryAgentService } from '../../../../services/delivery-agent.service';
import { PizzaDelivery } from '../../../../commons/interfaces/pizza-delivery';
import { StorageService } from '../../../../services/storage.service';
import { StatusDelivery } from '../../../../commons/enums/status-delivery.enum';
import { CountPendingService } from '../../../../services/count-pending.service';
import { Storage } from '@ionic/storage';
import { CountCompleteService } from '../../../../services/count-complete.service';

const PAGE_SIZE = 10;
const ORDERDATE_DESC = "orderDate,-1";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent implements OnInit {

  pizzaDeliverysCurrent: PizzaDelivery[] = new Array();
  pizzaDeliverys: PizzaDelivery[] = new Array();
  pizzaDelivery : PizzaDelivery;
  dataResponse  : any;
  pageData      : any;
  pageCurrent   : number = 0;
  statusDelivery: string[];
  countPending  : number = 0;
  countComplete : number = 0;
  agentIdCurrent: string;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');;
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = String(this.today.getFullYear());

  todayStringInit: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 0, 0, 0);
  todayStringEnd: Date = new Date(Number(this.today.getFullYear()), Number(this.today.getMonth()), Number(this.today.getDate()), 23, 59, 59);

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) ionRefresher: IonRefresher;

  constructor(private deliveryAgentService: DeliveryAgentService
    , private router                : Router
    , private route                 : ActivatedRoute
    , private storageService        : StorageService
    , public toastController        : ToastController
    , private countPendingService   : CountPendingService
    , private countCompleteService  : CountCompleteService
    , private storage: Storage) { }

  async ngOnInit() {
    await this.loadToken();
    this.route.paramMap.subscribe(
      params => {
        const statusDelivery: string = String(params.get("statusDelivery"));
        this.statusDelivery = statusDelivery.split(",");
        console.log("this.statusDelivery  ::: " + this.statusDelivery);
        this.pizzaDeliverys = [];
        this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      }
    );
  }

  async loadToken() {
    this.agentIdCurrent = await this.storage.get('agentId') || null;
  }

  async showStatus(status: string, success: number) {

    var messageCurrent: string = "";
    var typeAlert: string = "danger";

    switch (status) {
      case StatusDelivery.DELIVERY_PENDING.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
        break;
      case StatusDelivery.DELIVERY_CANCELED.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
        break;
      case StatusDelivery.DELIVERY_CONFIRMED.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
        break;
      case StatusDelivery.DELIVERY_PREPARING.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
        break;
      case StatusDelivery.DELIVERY_ASSIGNED.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
        break;
      case StatusDelivery.DELIVERY_ONWAY.toString():
        if (success)
          messageCurrent = "Se ha iniciado la entrega.";
        else
          messageCurrent = "No se pudo iniciar la entrega";
        break;
      case StatusDelivery.DELIVERY_COMPLETE.toString():
        if (success)
          messageCurrent = "Se ha completado la entrega.";
        else
          messageCurrent = "No se pudo completar la entrega";
        break;
      case StatusDelivery.DELIVERY_FAIL.toString():
        if (success)
          messageCurrent = "";
        else
          messageCurrent = "";
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

  private consumeData(agentId: string
    , statusId: string[]
    , startDate: Date
    , endDate: Date
    , page: string
    , size: string
    , sort: string): void {
    this.deliveryAgentService.findByAgentId(agentId, statusId, startDate, endDate, page, size, sort)
      .subscribe(
        data => {
          if (data.success) {
            console.log("sucesss");
            this.pizzaDeliverysCurrent = data.pizzaDeliveries as PizzaDelivery[];
            this.pizzaDeliverys.push(... this.pizzaDeliverysCurrent);
            this.storageService.setPizzaDeliverys(this.pizzaDeliverys);
            this.pageData = data.page;
            for (let c of statusId)
              if (c == StatusDelivery.DELIVERY_ASSIGNED.toString() || c == StatusDelivery.DELIVERY_ONWAY.toString()) {
                this.countPending   = 0;
                for (let a of this.pizzaDeliverys)
                  if (a.status.statusId == StatusDelivery.DELIVERY_ASSIGNED.toString() || a.status.statusId == StatusDelivery.DELIVERY_ONWAY.toString())
                    this.countPending++;
                this.countPendingService.sendCountPending(this.countPending);
              }else if( c == StatusDelivery.DELIVERY_COMPLETE.toString() ){
                this.countComplete  = 0;
                for (let a of this.pizzaDeliverys)
                  if (a.status.statusId == StatusDelivery.DELIVERY_COMPLETE.toString() )
                    this.countComplete++;
                this.countCompleteService.sendCountComplete(this.countComplete);
              }
          }
        }
      );
  }

  loadData(event) {
    setTimeout(() => {
      this.pageCurrent++;
      console.log("this.pageCurrent ::: " + this.pageCurrent);
      this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.infiniteScroll.complete();
      console.log("this.pizzaDeliverys.length ::: " + this.pizzaDeliverys.length);
    }, 500);
  }

  doRefresh(event) {
    this.pizzaDeliverys = [];
    this.pageCurrent = 0;
    setTimeout(() => {
      this.consumeData(this.agentIdCurrent, this.statusDelivery, this.todayStringInit, this.todayStringEnd, String(this.pageCurrent), String(PAGE_SIZE), ORDERDATE_DESC);
      this.ionRefresher.complete();
    }, 1000);
  }

  changeDeliveryStatus(deliveryId: string, status: string) {
    this.pizzaDelivery = this.storageService.getPizzaDeliveryByDeliveryId(deliveryId);
    this.pizzaDelivery.status.statusId = status;
    this.pizzaDelivery.status.statusDelivery = StatusDelivery[status];
    if(status == StatusDelivery.DELIVERY_COMPLETE.toString() )
      this.pizzaDelivery.deliveryDate = new Date();
    this.deliveryAgentService.updateDelivery(this.pizzaDelivery).subscribe(
      data => {
        this.showStatus(status, 1);
        this.doRefresh(null);
      }, err => {
        this.showStatus(status, 0);
      }
    )
  }

  async claanPizzaDeliver() {
    this.pizzaDeliverys = [];
    return null;
  }

}

