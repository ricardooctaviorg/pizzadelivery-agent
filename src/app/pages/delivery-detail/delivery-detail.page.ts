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
  assignDateString  : string;
  deliveryDateString: string;
  assignDate        : Date    = null;
  deliveryDate      : Date    = null;
  totalAmount       : string;


  constructor(private router        : Router
    , private route                 : ActivatedRoute
    , private infoAgentService      : InfoAgentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const deliveryId        : string  = String(params.get("deliveryId"));
        const statusId          : string  = String(params.get("statusId"));
        const nameCustomerB64   : string  = String(params.get("nameCustomer"));
        const phoneCustomerB64  : string  = String(params.get("phoneCustomer"));
        const assignDate        : string  = String(params.get("assignDate"));
        const deliveryDate      : string  = String(params.get("deliveryDate"));
        const totalAmountS      : string  = String(params.get("totalAmount"));
        this.deliveryIdCurrent            = deliveryId;
        this.statusIdCurrent              = statusId;
        this.nameCustomer                 = nameCustomerB64;
        this.phoneCustomer                = phoneCustomerB64;
        this.assignDateString             = assignDate;
        this.deliveryDateString           = deliveryDate;
        this.totalAmount                  = totalAmountS;
        this.assignDate                   = params.get("assignDate")!=='null'?new Date(params.get("assignDate")):null;
        this.deliveryDate                 = params.get("deliveryDate")!=='null'?new Date(params.get("deliveryDate")):null;
        }
    );
    this.infoAgentService.detailTypeTitle.subscribe(
      title => {
        this.titleDetailType = title;
      }
    );
    this.router.navigate(['delivery-detail',this.deliveryIdCurrent,this.statusIdCurrent, this.nameCustomer, this.phoneCustomer, this.assignDateString, this.deliveryDateString, this.totalAmount ,'detailLocation',this.deliveryIdCurrent]);
  }
}
