import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.page.html',
  styleUrls: ['./assessment-report.page.scss'],
})
export class AssessmentReportPage implements OnInit {
  isshow: any = false;
  isshow2: any = false;
  isshow3: any = false;
  showFile(val: any) {
    if ( val === 1) {
      this.isshow = !this.isshow;
    } else if ( val === 2) {
      this.isshow2 = !this.isshow2;
    } else if (val === 3) {
      this.isshow3 = !this.isshow3;
    }
}
  constructor() { }

  ngOnInit() {
  }

}
