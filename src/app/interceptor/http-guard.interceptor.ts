/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-08-30 10:15:51
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-09-04 10:27:10
 * @FilePath: \auto_scan_system_frontend\src\app\interceptor\http-guard.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable()
export class HttpGuardInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private token: TokenStorage,
    private snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    let url = request.url // 可以对url进行处理
    // 登录请求排除在外
    if (!url.includes('login')) {
      if (this.token.getToken() != null) {
        request = request.clone({
          setHeaders: {
            Authorization: this.token.getToken()
          }
        });
      }
    }
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.status !== 200) {
              // 处理错误
              this.router.navigate(['']);
            }
          }
        },
        error => {
          // token过期 服务器错误等处理
          this.snackBar.open('Token已过期,请重新登录', '关闭', {
            duration: 3000
          });
          this.router.navigate(['']);
        })
    );
  }
}
