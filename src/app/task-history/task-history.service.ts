/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:21:29
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 11:36:02
 * @FilePath: \auto_scan_system_frontend\src\app\task-history\task-history.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TaskHistoryService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS' });
  API_URL = '//localhost:8080/taskHistory';
  constructor(
    private http: HttpClient
  ) { }

  searchTaskHistory(userId: any): Observable<any> {
    return this.http.get(this.API_URL + '/findTaskHistoryByUserId/' + userId, { headers: this.headers, observe: 'response' });
  }

  downloadFile(fileName: string): Observable<any> {
    return this.http.post(this.API_URL + '/exportSavedFile/' + fileName, null, { responseType: 'blob', headers: this.headers, observe: 'response', reportProgress: true })
  }
}
