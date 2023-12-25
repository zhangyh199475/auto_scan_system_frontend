/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:20:41
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 10:19:16
 * @FilePath: \auto_scan_system_frontend\src\app\header\header.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.module';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenStorage } from '../interceptor/token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User = new User;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public tokenStorage: TokenStorage
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  onLogout() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '退出登录',
        content: '是否退出登录？'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }

  onUserInfo() {
    this.router.navigate(['/home/user-detail'], {
      queryParams: {
        userId: this.user.userId,
        isFromHeader: true,
      }, skipLocationChange: true
    });
  }
}
