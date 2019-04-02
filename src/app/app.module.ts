import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; //  引入请求方式
import { HttpModule } from '@angular/http'; // No provider for Http 要添加这个
import { HttpClientModule } from '@angular/common/http'; // 引入http接口方法

import { ComponentsModule } from '../components/components.module';
import { MapService } from '../components/ths-map/map.service';
// import { ExamineListPage }  from '../app/pages/examine-list/examine-list.page'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
