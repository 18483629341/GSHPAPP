import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-handling',
  templateUrl: './handling.page.html',
  styleUrls: ['./handling.page.scss'],
})
export class HandlingPage implements OnInit {


  listAarry: any = [
    {x1: '窗口受理', x2: '张三', x3: '2018-08-08', x4: '2018-08-08', x5: '同意'},
    {x1: '副处长分配', x2: '李四', x3: '2018-08-08', x4: '2018-08-08', x5: '同意'},
    {x1: '技术评估', x2: '王五', x3: '2018-08-08', x4: '2018-08-08', x5: '同意'},
    {x1: '会签', x2: '张思', x3: '2018-08-08', x4: '2018-08-08', x5: '同意'},
    {x1: '经办人办理', x2: '赵柳', x3: '2018-08-08', x4: '2018-08-08', x5: '同意'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
