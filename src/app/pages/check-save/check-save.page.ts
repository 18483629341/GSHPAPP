import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
import { ElementRef} from '@angular/core';
@Component({
  selector: 'app-check-save',
  templateUrl: './check-save.page.html',
  styleUrls: ['./check-save.page.scss'],
})
export class CheckSavePage implements OnInit {
  recordTime: any = '';
  checkPeople: any = '';
  isKonwProtectMeasures: any = false;
  isReplyDocument: any = false;
  isPublicProtectMeasures: any = false;
  isDesignProtectMeasures: any = false;
  isPlanStartTime: any = false;
  isOpenEnvironInformation: any = false;
  isInformStandard: any = false;
  isInformMain: any = false;
  isInformDesign: any = false;
  isStart: any = false;
  isEnvironInvestment: any = false;
  isNoChange: any = false;
  isHaveInvestment: any = false;
  isProtectReady: any = false;
  isInformStrict: any = false;
  remark: any = '';
  constructor(public projectFilesService: ProjectFilesService, private el: ElementRef) { }

  ngOnInit() {
  
  }
  //  返回按钮
  back() {
    history.back();
  }
  //  提交
  commit() {
    this.getCheckSave();
  }

  getCheckSave(): void {
    this.projectFilesService.getCheckSave({
      projectCode: 1,
      recordTime: this.recordTime,
      checkPeople: this.checkPeople,
      isKonwProtectMeasures: this.isKonwProtectMeasures ? 1 : 0,
      isReplyDocument: this.isReplyDocument ? 1 : 0,
      isPublicProtectMeasures: this.isPublicProtectMeasures ? 1 : 0,
      isDesignProtectMeasures: this.isDesignProtectMeasures ? 1 : 0,
      isPlanStartTime: this.isPlanStartTime ? 1 : 0,
      isOpenEnvironInformation: this.isOpenEnvironInformation ? 1 : 0,
      isInformStandard: this.isInformStandard ? 1 : 0,
      isInformMain: this.isInformMain ? 1 : 0,
      isInformDesign: this.isInformDesign ? 1 : 0,
      isStart: this.isStart ? 1 : 0,
      isEnvironInvestment: this.isEnvironInvestment ? 1 : 0,
      isNoChange: this.isNoChange ? 1 : 0,
      isHaveInvestment: this.isHaveInvestment ? 1 : 0,
      isProtectReady: this.isProtectReady ? 1 : 0,
      isInformStrict: this.isInformStrict ? 1 : 0,
    }, true, res => {
      if (res !== 'error') {
        console.log(res);
        // if (true) {
        //     if (this.isKonwProtectMeasures) {
        //       this.el.nativeElement.querySelector('#box1').style.display = 'none';
        //     }
        // }
      }
    });
  }
}
