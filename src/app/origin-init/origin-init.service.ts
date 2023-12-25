/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-09-05 16:37:06
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-12-25 10:28:00
 * @FilePath: \auto_scan_system_frontend\src\app\origin-init\origin-init.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OriginInitService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS' });
  API_URL = '//localhost:8080/robot';
  constructor(
    private http: HttpClient
  ) { }

  getWorldCoordinate(): Observable<any> {
    return this.http.get(this.API_URL + '/getWorldCoordinate', { headers: this.headers, observe: 'response' });
  }

  setWorldCoordinate(movePosition: number[]): Observable<any> {
    return this.http.post(this.API_URL + '/setWorldCoordinate', movePosition, { headers: this.headers, observe: 'response', reportProgress: true })
  }

  getAllRange(worldCoordinateArr: number[]): Observable<any> {
    return this.http.get(this.API_URL + '/getAllRange/' + worldCoordinateArr, { headers: this.headers, observe: 'response' });
  }

  resetCenter(userId: number): Observable<any> {
    return this.http.get(this.API_URL + '/resetCenter/' + userId, { headers: this.headers, observe: 'response' });
  }

  resetAngle(): Observable<any> {
    return this.http.get(this.API_URL + '/resetAngle', { headers: this.headers, observe: 'response' });
  }

  finishInit(userId: number, angle: number): Observable<any> {
    return this.http.get(this.API_URL + '/finishInit/' + userId + '/' + angle, { headers: this.headers, observe: 'response' });
  }

  getInitPosition(userId: number): Observable<any> {
    return this.http.get(this.API_URL + '/getInitPosition/' + userId, { headers: this.headers, observe: 'response' });
  }

  getMoveState(): Observable<any> {
    return this.http.get(this.API_URL + '/getMoveState', { headers: this.headers, observe: 'response' });
  }

}
