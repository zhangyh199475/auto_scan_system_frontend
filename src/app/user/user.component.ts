import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user.module';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userSearchForm!: FormGroup;
  dataSource!: MatTableDataSource<User>;
  userName!: string;
  displayedColumns: string[] = [];
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.displayedColumns = [
      'userId',
      'userName',
      'roleId',
      'email',
      'action'
    ]

    this.onSearch();
  }

  onSearch() {
    this.userService.getUserList().subscribe(result => {
      const userList = result["body"];
      this.dataSource = new MatTableDataSource<User>(userList);
    })
  }

  toAction(row: { userId: number; userName: string; password: string; roleId: number; email: string; }) {
    this.router.navigate(['/home/user-detail'], {
      queryParams: {
        userId: row.userId,
      }, skipLocationChange: true
    });
  }

  toAdd() {
    this.router.navigate(['/home/user-detail'], { skipLocationChange: true });
  }
}
