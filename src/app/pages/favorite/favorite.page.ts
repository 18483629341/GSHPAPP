import { Component, OnInit } from '@angular/core';
import { ProjectFilesService } from '../../service/project-files.service'; // 引入接口方法
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoriteList: any = [];
  constructor( public projectFilesService: ProjectFilesService) { }

  ngOnInit() {
   let arr = this.projectFilesService.favoriteList;
   console.log(arr)
  //  let  set = new Set(arr)
  //  this.favoriteList = Array.from(set)
  for (let i = 0; i < arr.length; i++) {
    if(this.favoriteList.indexOf(arr[i])==-1){
      this.favoriteList.push(arr[i]);
     }
    }

  }

}
