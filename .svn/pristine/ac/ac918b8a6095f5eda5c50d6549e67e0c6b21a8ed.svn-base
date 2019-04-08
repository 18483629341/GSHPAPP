import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; //  引入请求方式
import { LoadingController, Platform, AlertController, ToastController, Events } from '@ionic/angular'; // 引入loading
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    public loadingController: LoadingController
  ) {
  }
  /**
   * 配置GET请求方式
   // tslint:disable-next-line:no-redundant-jsdoc
   * @param {String} url 请求地址(必传)
   * @param {any} params 参数(必传)
   * @param {Boolean} showloading 是否显示Loading框(必传)boolean值
   * @param {Function} callback 回调函数(必传)
   */
  async get(url, params, showloading, callback) {
    let loader = null;
    if (showloading) {
      loader = await this.presentLoading('');
    }

    this.httpClient.get(url, { responseType: 'json', params: this.httpParams(params) })
      .subscribe(
        res => {
          if (showloading) {
            this.hideLoading(loader);
          }
          if (res) {
            callback(res);
          } else {
            // this.Toast('数据请求失败，请重试');
            callback('error');
          }
        },
        err => {
          if (showloading) {
            this.hideLoading(loader);
          }
          // this.Toast('数据请求失败，请重试');
          callback('error');
        }
      );
  }

  /**
 * 发送HTTP请求post方法
 * @param {string} url 发送请求的地址
 * @param {Object} params 发送到服务器的数据，键值对形式
 * @param {fun} success 发送请求成功的函数
 * @param {fun} error 发送请求失败的函数
 * @param {boolean} flag 是否显示数据加载,false或不传参为显示，true不显示
 */
  async post(url, params, showloading, callback) {
    let loader = null;
    if (showloading) {
      loader = await this.presentLoading('');
    }

    this.httpClient.post(
      url,
      this.httpParams(params)
      // this.httpOptions() // 拦截中用了header
    ).subscribe(
      res => {
        if (showloading) {
          this.hideLoading(loader);
        }
        if (res) {
          callback(res);
        } else {
          // this.Toast('数据请求失败，请重试');
          callback('error');
        }
      },
      err => {
        if (showloading) {
          this.hideLoading(loader);
        }
        // this.Toast('数据请求失败，请重试');
        callback('error');
      }
    );
  }
  /**
   * 响应头参数
   */
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }

  /**
  * params处理
  * @param {Object} param 调用函数传过来的参数，键值对形式
  */
  httpParams(param: Map<any, any>): HttpParams {
    let ret = new HttpParams();
    if (param) {
      for (const key in param) {
         if (key) {
          ret = ret.set(key, param[key]);
        }
        // if (param[key]) {
        //   console.log(param[key])
        //   ret = ret.set(key, param[key]);
        //   console.log(ret);
        // }
      }
    }
    return ret;
  }

  /**
   * showloading服务
   * @param template 展示内容(选传)
   */
  async presentLoading(template?) {
    const loader = await this.loadingController.create({
      // message: template ? `<p>${template}</p>` : '',
      // mode: 'ios',
      spinner: 'circles',
      // message:'正在努力加载...'
     
    });
    await loader.present();
    return loader;
  }

  /**
   * 关闭loading
   * @param {any} loader 创建的loading对象
   */
  hideLoading(loader) {
    loader.dismiss();
  }
}
