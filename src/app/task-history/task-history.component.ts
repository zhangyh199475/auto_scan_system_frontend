import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TaskHistory } from './task-history.module';
import { TaskHistoryService } from './task-history.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../user/user.module';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css'],
})
export class TaskHistoryComponent implements OnInit {

  taskHistoryForm!: FormGroup;
  dataSource!: MatTableDataSource<TaskHistory>;
  displayedColumns = [''];
  user!: User;

  constructor(
    private taskHistoryService: TaskHistoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.displayedColumns = [
      'taskId',
      'type',
      'state',
      'saveFile',
      'sendEmail',
      'createdTime',
      'finishTime',
      'download',
      'retry',
      'anglePosition',
      'xPosition',
      'yPosition',
      'zPosition',
      'uPosition',
      'vPosition',
      'wPosition',
      'scanSurface',
      'sPara',
      'aMin',
      'aMax',
      'aStep',
      'bMin',
      'bMax',
      'bStep',
      'freqMin',
      'freqMax',
      'freqStep'
    ]

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const userId = this.user.userId || 0;

    this.taskHistoryService.searchTaskHistory(userId).subscribe(result => {
      const taskHistory = result["body"];
      this.dataSource = new MatTableDataSource<TaskHistory>(taskHistory);
    })
  }

  toDownload(saveFile: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '结果下载',
        content: '是否下载实验结果？'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskHistoryService.downloadFile(saveFile).subscribe(async resp => {
          this.downloadFile(resp['body'], saveFile);
        })
      }
    });
  }

  toRetry() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '重做实验',
        content: '是否重做实验？'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  downloadFile(data: any, saveFile: string) {
    // 下载类型 xls
    // const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // 下载类型：csv
    const contentType = 'text/csv';
    const blob = new Blob([data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    // 打开新窗口方式进行下载
    // window.open(url);

    // 以动态创建a标签进行下载
    const link = document.createElement('a');
    link.href = url;
    link.download = saveFile;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
