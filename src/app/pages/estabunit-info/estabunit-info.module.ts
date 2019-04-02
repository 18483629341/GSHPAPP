import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstabunitInfoPage } from './estabunit-info.page';

const routes: Routes = [
  {
    path: '',
    component: EstabunitInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EstabunitInfoPage]
})
export class EstabunitInfoPageModule {}
