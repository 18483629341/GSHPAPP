import { Component, OnInit ,ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-environmental-list',
  templateUrl: './environmental-list.page.html',
  styleUrls: ['./environmental-list.page.scss'],
})
export class EnvironmentalListPage implements OnInit {
  title: string;
  public listArray: any = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeRoute.snapshot.params);
    if (this.activeRoute.snapshot.params.id === 1) {
      this.title = '建设项目环境保护申请登记表';
      this.listArray = [
        {title: '项目名称', main: '兰州祁连山水泥商砼有限公司厂区扩建项目'},
        {title: '建设单位', main: '兰州祁连山水泥商砼有限公司'},
        {title: '负责人', main: '张三'},
        {title: '建设地点', main: '兰州市西固区环形路28号'},
        {title: '电话', main: '12345678901'},
        {title: '所属市州', main: '兰州市'},
        {title: '所属区县', main: '西固区'},
        {title: '项目性质', main: '新建'},
        {title: '主管部门', main: '甘肃省发改委'},
        {title: '总投资(万元)', main: '1200'},
        {title: '环保投资', main: '200'},
        {title: '预计投产使用时间', main: '2020-08-08'},
        {title: '申请登记人', main: '张三'},
        {title: '占地面积(平方米)', main: '20000'},
        {title: '建筑面积(平方米)', main: '40000'},
        {title: '年增耗水量(吨)', main: '120000'},
        {title: '年增耗煤量(吨)', main: '40000'},
        {title: '排水去向', main: '市政管网'},
        {title: '申请日期', main: '20180808'},
        {title: '是否在水源保护区', main: '否'},
        {title: '是否在无煤区', main: '否'},
        {title: '涂料使用总量(吨/年)', main: '1200'},
        {title: '其中低挥发性涂料使用量(吨/年)', main: '0'},
        {title: '建设地址经度', main: '0'},
        {title: '建设地址纬度', main: '0'},
      ];
      console.log(window.innerWidth);
    } else if (this.activeRoute.snapshot.params.id === 2) {
      this.title = '建设项目环评审批基础信息表1';
      this.listArray = [
        {title: '项目名称', main: '234234'},
        {title: '建设单位', main: '32423432'},
        {title: '负责人', main:' 张三'},
        {title: '建设地点', main: '兰州市西固区环形路28号'},
        {title: '电话', main: '12345678901'},
        {title: '所属市州', main: '兰州市'},
        {title: '所属区县', main: '西固区'},
        {title: '项目性质', main: '新建'},
        {title: '主管部门', main: '甘肃省发改委'},
        {title: '总投资(万元)', main: '1200'},
        {title: '环保投资', main: '200'},
        {title: '预计投产使用时间', main: '2020-08-08'},
        {title: '申请登记人', main: '张三'},
        {title: '占地面积(平方米)', main: '20000'},
        {title: '建筑面积(平方米)', main: '40000'},
        {title: '年增耗水量(吨)', main: '120000'},
        {title: '年增耗煤量(吨)', main: '40000'},
        {title: '排水去向', main: '市政管网'},
        {title: '申请日期' , main: '20180808'},
        {title: '是否在水源保护区', main: '否'},
        {title: '是否在无煤区', main: '否'},
        {title: '涂料使用总量(吨/年)', main: '1200'},
        {title: '其中低挥发性涂料使用量(吨/年)' , main: '0'},
        {title: '建设地址经度', main: '0'},
        {title: '建设地址纬度', main: '0'},
      ]
    }
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll 
    }, 2000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
