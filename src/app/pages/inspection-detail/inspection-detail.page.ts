import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
})
export class InspectionDetailPage implements OnInit {
  listAarry: any = [
    {num: 1,  check:  '建设单位已经清楚建设的环保措施', result: '已检查确认', info: ''},
    {num: 2, check: '批复文件已经收到', result: '已检查确认', info: ''},
    {num: 3, check: '环保措施已公开', result: '已检查确认', info: '现场照片'},
    {num: 4, check: '环保施设已开始设计', result: '已检查确认', info: ''},
    {num: 5, check: '计划开工时间', result: '已检查确认', info: ''},
    {num: 6, check: '已按照要求公开相关环境信息', result: '检查未通过', info: ''},
    {num: 7, check: '已告知建设单位严格按标准规范、环评文件及批复要求开展环保设施设计工作', result: '已检查确认', info: ''},
    {num: 8, check: '已告知建设单位是落实环保责任的主体', result: '已检查确认', info: ''},
    {num: 9, check: '已按照求进行了“三同时”设计', result: '已检查确认', info: ''},
    {num: 10, check: '已开工建设', result: '待检查', info:''},
    {num: 11, check: '环保投资已“同时施工”', result: '已检查确认', info: ''},
    {num: 12, check: '建设规模、地点、内容、环保设施未发生变更', result: '检查未通过', info: ''},
  ]
  constructor() { }

  ngOnInit() {
  }

}
