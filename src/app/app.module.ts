/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-06 16:41:59
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 16:25:39
 * @FilePath: \auto_scan_system_frontend\src\app\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { CoreComponent } from './core/core.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OriginInitComponent } from './origin-init/origin-init.component';
import { TaskSetComponent } from './task-set/task-set.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { SParaComponent } from './s-para/s-para.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog'
import { HttpGuardInterceptor } from './interceptor/http-guard.interceptor';
import { TokenStorage } from './interceptor/token.storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    CoreComponent,
    OriginInitComponent,
    TaskSetComponent,
    TaskHistoryComponent,
    SParaComponent,
    UserDetailComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    TokenStorage,
    { provide: HTTP_INTERCEPTORS, useClass: HttpGuardInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
