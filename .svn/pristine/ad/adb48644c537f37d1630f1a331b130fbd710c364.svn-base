import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-info',
  templateUrl: './pro-info.page.html',
  styleUrls: ['./pro-info.page.scss'],
})
export class ProInfoPage implements OnInit {
  public relativeUnitArr=[
    {projectCode:1,projectName:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {projectCode:2,projectName:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {projectCode:3,projectName:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {projectCode:4,projectName:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {projectCode:5,projectName:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
  ];
  constructor(public router: Router) { }

  ngOnInit() {
  }
  goToRelated(i){
      console.log('projectCode:'+i);
      this.router.navigateByUrl('/pro-info-related');
  }
}
