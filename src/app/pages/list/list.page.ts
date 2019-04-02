import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public id: any;
  // listArray :any =[
  //   {title:'环评文件',main:'编制报告书'},
  //   {title:'申请人类别',main:'个人'},
  //   {title:'许可类别',main:'审批制'},
  //   {title:'项目名称',main:'新建'},
  //   {title:'建设单位(投资人)',main:'兰州祁连山水泥商砼有限公司'},
  //   {title:'有无统一社会信用代码',main:'有'},
  //   {title:'组织机构代码',main:'123456789'},
  //   {title:'建设地点',main:'兰州市西固区环形路28号'},
  //   {title:'立项部门',main:'甘肃省发改委'},
  //   {title:'行业类别',main:'水泥制造'},
  //   {title:'环评单位',main:'鼎盛环评有限公司'},
  //   {title:'环评类别',main:'建材火电'},
  //   {title:'环评工程师',main:'张艺'},
  //   {title:'项目属性',main:'1234'},
  //   {title:'建设项目类别',main:'非金属矿物制品'},
  // ]

  constructor( public activeRoute: ActivatedRoute) { }

  ngOnInit() {
      console.log(this.activeRoute)
  }

}
