/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:20:50
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 11:38:17
 * @FilePath: \auto_scan_system_frontend\src\app\login\login.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FunctionMapping, User } from '../user/user.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { TokenStorage } from '../interceptor/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signinForm!: FormGroup;
  public userName: string = 'Pengcheng';
  public password: string = '123456';
  public user: User = new User;
  public functionMapping: FunctionMapping = new FunctionMapping;
  public isHide = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorage
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = new FormGroup({
      userName: new FormControl(this.userName),
      password: new FormControl(this.password),
    });
  }

  onSubmit() {
    this.userService.login(this.signinForm.value).subscribe(result => {
      this.user = result['body']['user'];
      localStorage.setItem('user', JSON.stringify(this.user))

      this.functionMapping = new FunctionMapping();
      this.functionMapping.userMapping = false;
      setTimeout(() => {
        let token = result['body']['token'];
        if (this.user.roleId === 1) {
          this.functionMapping.userMapping = true;
        }

        this.tokenStorage.saveToken(token);

        localStorage.setItem('functionMapping', JSON.stringify(this.functionMapping));

        this.router.navigate(['/home/origin-init']);
      }, 1000);

    })
    // this.user.userId = 1;
    // this.user.userName = this.userName;
    // this.user.roleId = 1;
    // localStorage.setItem('user', JSON.stringify(this.user))
    // this.functionMapping = new FunctionMapping();
    // this.functionMapping.userMapping = false;
    // setTimeout(() => {
    //   if (this.user.roleId === 1) {
    //     this.functionMapping.userMapping = true;
    //   }

    //   localStorage.setItem('functionMapping', JSON.stringify(this.functionMapping));

    //   this.router.navigate(['/home']);
    // }, 1000);
  }

  toRemoveUserName() {
    this.userName = '';
  }

  toHidePassword() {
    this.isHide = !this.isHide;
  }
}
