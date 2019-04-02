import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-hpzj-info',
  templateUrl: './hpzj-info.page.html',
  styleUrls: ['./hpzj-info.page.scss'],
})
export class HpzjInfoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  str: any = '1'
  OnitemClick(num) {
    this.str = num;
  }

  // 跳转测试
  goPartakePro() {
    this.router.navigate(['partakepro']);
  }
}
