import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-info',
  templateUrl: './pro-info.page.html',
  styleUrls: ['./pro-info.page.scss'],
})
export class ProInfoPage implements OnInit {
  public relativeUnitArr=[
    {id:1,name:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {id:2,name:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {id:3,name:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {id:4,name:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
    {id:5,name:'兰州祁连山水泥商砼有限公司厂区扩建项目'},
  ];
  constructor() { }

  ngOnInit() {
  }
  changeOption(i){
      console.log('id:'+i);
  }
}
