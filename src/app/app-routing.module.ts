import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  }, // 默认加载页面
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'list/:id', loadChildren: './pages/list/list.module#ListPageModule' },
  { path: 'environmental-list/:id', loadChildren: './pages/environmental-list/environmental-list.module#EnvironmentalListPageModule' },
  { path: 'project-files', loadChildren: './pages/project-files/project-files.module#ProjectFilesPageModule' },
  { path: 'examine-list', loadChildren: './pages/examine-list/examine-list.module#ExamineListPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'base-info', loadChildren: './pages/base-info/base-info.module#BaseInfoPageModule' },
  { path: 'login-table', loadChildren: './pages/login-table/login-table.module#LoginTablePageModule' },
  { path: 'approval-form', loadChildren: './pages/approval-form/approval-form.module#ApprovalFormPageModule' },
  { path: 'approval-form2', loadChildren: './pages/approval-form2/approval-form2.module#ApprovalForm2PageModule' },
  { path: 'approval-form3', loadChildren: './pages/approval-form3/approval-form3.module#ApprovalForm3PageModule' },
  { path: 'related-info', loadChildren: './pages/related-info/related-info.module#RelatedInfoPageModule' },
  { path: 'handling', loadChildren: './pages/handling/handling.module#HandlingPageModule' },
  { path: 'reply-doc', loadChildren: './pages/reply-doc/reply-doc.module#ReplyDocPageModule' },
  { path: 'assessment-report', loadChildren: './pages/assessment-report/assessment-report.module#AssessmentReportPageModule' },
  { path: 'accept-info', loadChildren: './pages/accept-info/accept-info.module#AcceptInfoPageModule' },
  { path: 'record-info', loadChildren: './pages/record-info/record-info.module#RecordInfoPageModule' },
  { path: 'inspection-record', loadChildren: './pages/inspection-record/inspection-record.module#InspectionRecordPageModule' },
  { path: 'pro-info', loadChildren: './pages/pro-info/pro-info.module#ProInfoPageModule' },
  { path: 'estabunit-info', loadChildren: './pages/estabunit-info/estabunit-info.module#EstabunitInfoPageModule' },
  { path: 'hpzj-info', loadChildren: './pages/hpzj-info/hpzj-info.module#HpzjInfoPageModule' },
  { path: 'engineer', loadChildren: './pages/engineer/engineer.module#EngineerPageModule' },
  { path: 'proinfo', loadChildren: './pages/proinfo/proinfo.module#ProinfoPageModule' },
  { path: 'sincerity', loadChildren: './pages/sincerity/sincerity.module#SincerityPageModule' },
  { path: 'partakepro', loadChildren: './pages/partakepro/partakepro.module#PartakeproPageModule' },
  { path: 'inspection-detail', loadChildren: './pages/inspection-detail/inspection-detail.module#InspectionDetailPageModule' },
  { path: 'check-save', loadChildren: './pages/check-save/check-save.module#CheckSavePageModule' },
  { path: 'test-info', loadChildren: './pages/test-info/test-info.module#TestInfoPageModule' },
  { path: 'personal-center', loadChildren: './pages/personal-center/personal-center.module#PersonalCenterPageModule' },
  { path: 'favorite', loadChildren: './pages/favorite/favorite.module#FavoritePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
