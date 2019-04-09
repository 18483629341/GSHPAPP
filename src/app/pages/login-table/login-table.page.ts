import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-login-table',
  templateUrl: './login-table.page.html',
  styleUrls: ['./login-table.page.scss'],
})
export class LoginTablePage implements OnInit {
  projectName: any;
  constructionUnit: any;
  chargePeople: any;
  constructionSite: any;
  phone: any;
  cityName: any;
  countyName: any;
  projectNature: any;
  competentDepartment: any;
  totalInvest: any;
  enviInvest: any;
  address: any;
  postalCode: any;
  estimatedTime: any;
  applyPeople: any;
  phone1: any;
  area: any;
  yearWater: any;
  yearCoal: any;
  drainageDirection: any;
  applicationTime: any;
  isReserve: any;
  isCoal: any;
  coating: any;
  lowCoating: any;
  constructionSiteLon: any;
  constructionSiteLat: any;
  mainProducts: any;
  mainProductsNumber: any;
  rawMaterial: any;
  rawMaterialNumber: any;
  surroundEnvironment: any;
  mark: any;
  constructor(public projectFilesService: ProjectFilesService ) {
     this.getLoginTable();
   }

  ngOnInit() {
  }
  getLoginTable(): void {
    this.projectFilesService.getLoginTable({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.projectName = res.projectName;
        this.constructionUnit = res.constructionUnit;
        this.chargePeople = res.chargePeople;
        this.constructionSite = res.constructionSite;
        this.phone = res.phone || '/';
        this.cityName = res.cityName;
        this.countyName = res.countyName;
        this.projectNature = res.projectNature;
        this.competentDepartment = res.competentDepartment;
        this.totalInvest = res.totalInvest;
        this.enviInvest = res.enviInvest;
        this.address = res.address;
        this.postalCode = res.postalCode;
        this.estimatedTime = res.estimatedTime;
        this.applyPeople = res.applyPeople;
        this.phone1 = res.telePhone;
        this.area = res.area;
        this.yearWater = res.yearWater;
        this.yearCoal = res.yearCoal;
        this.drainageDirection = res.drainageDirection;
        this.applicationTime = res.applicationTime;
        this.isReserve = res.isReserve;
        this.isCoal = res.isCoal;
        this.coating = res.coating;
        this.lowCoating = res.lowCoating;
        this.constructionSiteLon = res.constructionSiteLon;
        this.constructionSiteLat = res.constructionSiteLat;
        this.mainProducts = res.mainProducts;
        this.mainProductsNumber = res.mainProductsNumber || '/';
        this.rawMaterial = res.rawMaterial;
        this.rawMaterialNumber = res.rawMaterialNumber || '/';
        this.surroundEnvironment = res.surroundEnvironment;
        this.mark = res.mark;
      }
    });
  }
}
