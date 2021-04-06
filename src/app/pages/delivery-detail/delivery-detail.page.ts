import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../../commons/services/util.service';
import { InfoAgentService } from '../../commons/services/info-agent.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.page.html',
  styleUrls: ['./delivery-detail.page.scss'],
})
export class DeliveryDetailPage implements OnInit {

  deliveryIdCurrent : string;
  statusIdCurrent   : string;
  titleDetailType   : string;
  preTitle          : string = "DETALLE DE ";

  constructor(private router        : Router
    , private route                 : ActivatedRoute
    , private infoAgentService      : InfoAgentService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const deliveryId: string = String(params.get("deliveryId"));
        const statusId  : string = String(params.get("statusId"));
        this.deliveryIdCurrent    = deliveryId;
        this.statusIdCurrent      = statusId;
        }
    );

    this.infoAgentService.detailTypeTitle.subscribe(
      title => {
        this.titleDetailType = title;
      }
    );

    this.router.navigate(['delivery-detail',this.deliveryIdCurrent,this.statusIdCurrent,'detailLocation',this.deliveryIdCurrent]);
  }
}
