import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-proinfo',
  templateUrl: './proinfo.page.html',
  styleUrls: ['./proinfo.page.scss'],
})
export class ProinfoPage implements OnInit {
 /**参数字段  开始*/
 projectName: any;
 place: any;
 acceptanceTime: any;
 approvalTime: any;
 approvalDepartment: any;
 approvalNumber: any;
 filetype: any;
 sources: any;
 /**参数字段  结束*/
  constructor(public activatedRoute: ActivatedRoute, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      /**获取参数
       */console.log(params)
        const res = JSON.parse(params.ProInfo);
        this.projectName = res.projectName;
        this.place = res.place;
        this.acceptanceTime = res.acceptanceTime;
        this.approvalTime = res.approvalTime;
        this.approvalDepartment = res.approvalDepartment;
        this.approvalNumber = res.approvalNumber;
        this.filetype = res.filetype;
        this.sources = res.sources;
    });
   }

  ngOnInit() {
  }

}
