import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OriginInitComponent } from './origin-init/origin-init.component';
import { TaskSetComponent } from './task-set/task-set.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { SParaComponent } from './s-para/s-para.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: CoreComponent, children: [
      { path: 'user', component: UserComponent },
      { path: 'user-detail', component: UserDetailComponent },
      { path: 'origin-init', component: OriginInitComponent },
      { path: 'task-set', component: TaskSetComponent },
      { path: 's-para', component: SParaComponent },
      { path: 'task-history', component: TaskHistoryComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
