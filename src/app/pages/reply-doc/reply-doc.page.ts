import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply-doc',
  templateUrl: './reply-doc.page.html',
  styleUrls: ['./reply-doc.page.scss'],
})
export class ReplyDocPage implements OnInit {
  isshow: any = false;
  isshow2: any  = false;
  isshow3: any  = false;
  showFile(val) {
    if (val == 1) {
      this.isshow = !this.isshow;
    } else if (val== 2) {
      this.isshow2 = !this.isshow2;
    } else if (val== 3) {
      this.isshow3 = !this.isshow3;
    }
}
  constructor() { }

  ngOnInit() {
  }

}
