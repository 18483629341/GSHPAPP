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
        this.projectName = res.data[0].projectName;
        this.constructionUnit = res.data[1].constructionUnit;
        this.chargePeople = res.data[2].chargePeople;
        this.constructionSite = res.data[3].constructionSite;
        this.phone = res.data[4].phone;
        this.cityName = res.data[5].cityName;
        this.countyName = res.data[6].countyName;
        this.projectNature = res.data[7].projectNature;
        this.competentDepartment = res.data[8].competentDepartment;
        this.totalInvest = res.data[9].totalInvest;
        this.enviInvest = res.data[10].enviInvest;
        this.address = res.data[11].address;
        this.postalCode = res.data[12].postalCode;
        this.estimatedTime = res.data[13].estimatedTime;
        this.applyPeople = res.data[14].applyPeople;
        this.phone1 = res.data[15].phone;
        this.area = res.data[16].area;
        this.yearWater = res.data[17].yearWater;
        this.yearCoal = res.data[18].yearCoal;
        this.drainageDirection = res.data[19].drainageDirection;
        this.applicationTime = res.data[20].applicationTime;
        this.isReserve = res.data[21].isReserve;
        this.isCoal = res.data[22].isCoal;
        this.coating = res.data[23].coating;
        this.lowCoating = res.data[24].lowCoating;
        this.constructionSiteLon = res.data[25].constructionSiteLon;
        this.constructionSiteLat = res.data[26].constructionSiteLat;
        this.mainProducts = res.data[27].mainProducts;
        this.mainProductsNumber = res.data[28].mainProductsNumber;
        this.rawMaterial = res.data[29].rawMaterial;
        this.rawMaterialNumber = res.data[30].rawMaterialNumber;
        this.surroundEnvironment = res.data[31].surroundEnvironment;
        this.mark = res.data[32].mark;
      }
    });
  }
}
