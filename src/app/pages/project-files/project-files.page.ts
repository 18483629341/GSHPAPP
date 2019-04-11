import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.page.html',
  styleUrls: ['./project-files.page.scss'],
})
export class ProjectFilesPage implements OnInit {
  projectCode: any; // 项目id
  projectName: any;
  projectNumber: any;
  constructionNature: any;
  industryType: any;
  approvalOffice: any;
  technology: any;
  phone: any;


  // 申报信息
  declareInfo: any = [
    { src: '../../../assets/imgs/icon1.png', title: '建设项目基本情况' },
    { src: '../../../assets/imgs/icon2.png', title: '建设项目环境保护申请登记表' },
    { src: '../../../assets/imgs/icon3.png', title: '建设项目环评审批基础信息表(1)' },
    { src: '../../../assets/imgs/icon3.png', title: '建设项目环评审批基础信息表(2)' },
    { src: '../../../assets/imgs/icon3.png', title: '建设项目环评审批基础信息表(3)' },
    { src: '../../../assets/imgs/icon4.png', title: '相关资料' },
  ];
  // 审批信息
  examineInfo: any = [
    { src: '../../../assets/imgs/icon5.png', title: '办理过程' },
    { src: '../../../assets/imgs/icon6.png', title: '批复文件' },
  ];
  // 监管信息
  superviseInfo: any = [
    { src: '../../../assets/imgs/icon7.png', title: '技术评估报告' },
    { src: '../../../assets/imgs/icon8.png', title: '三同时检查记录' },
    { src: '../../../assets/imgs/icon9.png', title: '项目验收信息' },
    { src: '../../../assets/imgs/icon10.png', title: '后评价备案信息' },
    { src: '../../../assets/imgs/icon11.png', title: '建设单位信息' },
    { src: '../../../assets/imgs/icon12.png', title: '编制单位信息' },
  ];
  constructor(private router: Router, public projectFilesService: ProjectFilesService, public activatedRoute: ActivatedRoute, ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.projectCode = params.projectCode;
    });
  }
  // listArray: any = [
  //   {title: '项目编号', main: 'GSLZKJ00023'},
  //   {title: '建设性质', main: '扩建'},
  //   {title: '行业类别', main: '水泥制造'},
  //   {title: '审批机关', main: '兰州市环保局'},
  //   {title: '技术负责人', main: '王亮'},
  // ];

  ngOnInit() {
    this.getProjectInfo();
  }
  // 获取接口数据
  getProjectInfo(): void {
    this.projectFilesService.getProjectInfo({}, true, res => {
      console.log(res);
      if (res !== 'error') {
        this.projectName = res.projectName;
        this.projectNumber = res.projectNumber;
        this.constructionNature = res.constructionNature;
        this.industryType = res.industryType;
        this.approvalOffice = res.approvalOffice;
        this.technology = res.technology;
        this.phone = res.phone || '暂无号码';
      }
    });
  }

  // 跳转申报信息
  jumpPage(val) {
    if (val === 0) {
      this.router.navigate(['base-info'], { queryParams: { projectCode: 1 } });
    } else if (val === 1) {
      this.router.navigate(['login-table'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 2) {
      this.router.navigate(['approval-form'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 3) {
      // this.router.navigate(['approval-form2']);
      this.router.navigate(['check-save'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 4) {
      this.router.navigate(['approval-form3'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 5) {
      this.router.navigate(['related-info'], { queryParams: { projectCode: this.projectCode } });
    }
  }
  // 跳转审批信息
  jumpPage2(val) {
    if (val === 0) {
      this.router.navigate(['handling'], { queryParams: { projectCode: 1 } });
    } else if (val === 1) {
      this.router.navigate(['reply-doc'], { queryParams: { projectCode: this.projectCode } });
    }
  }
  // 监管信息
  jumpPage3(val) {
    if (val === 0) {
      this.router.navigate(['assessment-report'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 1) {
      this.router.navigate(['inspection-record'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 2) {
      this.router.navigate(['accept-info'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 3) {
      this.router.navigate(['record-info'], { queryParams: { projectCode: 1 } });
    } else if (val === 4) {
      this.router.navigate(['pro-info'], { queryParams: { projectCode: this.projectCode } });
    } else if (val === 5) {
      this.router.navigate(['estabunit-info'], { queryParams: { projectCode: this.projectCode } });
    }
  }
}
