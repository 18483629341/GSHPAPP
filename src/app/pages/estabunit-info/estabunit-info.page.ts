import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-estabunit-info',
  templateUrl: './estabunit-info.page.html',
  styleUrls: ['./estabunit-info.page.scss'],
})
export class EstabunitInfoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  str: any = '1';
  OnitemClick(num) {
    this.str = num;
  }

   // 跳转至工程师
  goEngineer() {
    this.router.navigate(['engineer'])
  }

  // 跳转至工程师
  goProInfo() {
    this.router.navigate(['proinfo'])
  }

  // 跳转至诚信信息
  goSincerityInfo() {
    this.router.navigate(['sincerity'])
  }
  proChangeStr: any = '1'
  OnChangeProClick(num) {
    this.proChangeStr = num;
  }
}
