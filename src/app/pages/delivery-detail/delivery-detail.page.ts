import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoAgentService } from '../../commons/services/info-agent.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  preTitle          : string = "DETALLE DE ";
  deliveryIdCurrent : string;
  statusIdCurrent   : string;
  titleDetailType   : string;
  nameCustomer      : string;
  phoneCustomer     : string;

  constructor(private router        : Router
    , private route                 : ActivatedRoute
    , private infoAgentService      : InfoAgentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const deliveryId        : string = String(params.get("deliveryId"));
        const statusId          : string = String(params.get("statusId"));
        const nameCustomerB64   : string = String(params.get("nameCustomer"));
        const phoneCustomerB64  : string = String(params.get("phoneCustomer"));
        this.deliveryIdCurrent    = deliveryId;
        this.statusIdCurrent      = statusId;
        this.nameCustomer         = nameCustomerB64;
        this.phoneCustomer        = phoneCustomerB64;
        }
    );
    this.infoAgentService.detailTypeTitle.subscribe(
      title => {
        this.titleDetailType = title;
      }
    );
    this.router.navigate(['delivery-detail',this.deliveryIdCurrent,this.statusIdCurrent, this.nameCustomer, this.phoneCustomer ,'detailLocation',this.deliveryIdCurrent]);
  }
}
