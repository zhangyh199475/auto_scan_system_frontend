import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  userDetailForm!: FormGroup;
  userId!: number;
  userName!: string;
  password!: string;
  roleId!: number;
  email!: string;
  datasource!: MatTableDataSource<User>;
  user: User = new User;
  isHide = false;
  isFromHeader = false;
  isLoginUser = false;

  constructor(
    private router: Router,
    private location: Location,
    private routeInfo: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userId = this.routeInfo.snapshot.queryParams['userId'] || -1;
    this.isFromHeader = this.routeInfo.snapshot.queryParams['isFromHeader'] || false;
    if (this.goSearch()) {
      this.initForm();
    }

    const loginUser = JSON.parse(localStorage.getItem('user') || '{}').userId;
    this.isLoginUser = this.isFromHeader || loginUser == this.userId;
  }

  initForm() {
    this.userDetailForm = new FormGroup({
      userId: new FormControl(this.userId),
      userName: new FormControl(this.userName),
      password: new FormControl(this.password),
      roleId: new FormControl(this.roleId),
      email: new FormControl(this.email),
    });
  }

  goBack() {
    if (this.isFromHeader) {
      this.router.navigate([this.location.path()])
    } else {
      this.router.navigate(['/home/user'], {
        skipLocationChange: true
      })
    }
  }

  goSearch() {
    this.userService.getUserByUserId(this.userId).subscribe(resp => {
      this.user = resp.body;
      this.userName = this.user.userName || '';
      this.password = this.user.password || '';
      this.roleId = this.user.roleId || -1;
      this.email = this.user.email || '';
    });
    return true;
  }

  goUpdate() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '更新用户',
        content: '是否更新用户' + this.userName + '信息?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.userId = this.userId;
        this.user.userName = this.userName;
        this.user.password = this.password;
        this.user.roleId = this.roleId;
        this.user.email = this.email;

        this.userService.updateUser(this.user).subscribe(
          result => {
            this.user = result.body;
          }
        );
      }
    });
  }

  goAdd() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '新增用户',
        content: '是否新增用户' + this.userName + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.userId = this.userId;
        this.user.userName = this.userName;
        this.user.password = this.password;
        this.user.roleId = this.roleId;
        this.user.email = this.email;
        this.userService.addUser(this.user).subscribe(
          result => {
            this.user = result.body;
          }
        );
      }
    });
  }

  goDelete() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '删除用户',
        content: '是否删除用户' + this.userName + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.userId).subscribe(
          result => {
            this.user = result.body;
          }
        );
      }
    });
  }

  toHidePassword() {
    this.isHide = !this.isHide;
  }
}
