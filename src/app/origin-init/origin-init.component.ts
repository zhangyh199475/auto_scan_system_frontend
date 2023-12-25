/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:21:19
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-12-25 10:46:41
 * @FilePath: \auto_scan_system_frontend\src\app\origin-init\origin-init.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OriginInitService } from './origin-init.service';
import { User } from '../user/user.module';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-origin-init',
  templateUrl: './origin-init.component.html',
  styleUrls: ['./origin-init.component.css'],
})
export class OriginInitComponent implements OnInit {
  public angleStep: number = 0.0;
  public xStep: number = 0.0;
  public yStep: number = 0.0;
  public zStep: number = 0.0;
  public uStep: number = 0.0;
  public vStep: number = 0.0;
  public wStep: number = 0.0;
  public moveForm!: FormGroup;
  public xMin: number = 0.0;
  public xMax: number = 0.0;
  public yMin: number = 0.0;
  public yMax: number = 0.0;
  public zMin: number = 0.0;
  public zMax: number = 0.0;
  user!: User;
  userId = 0;
  isResetAngle = true;

  constructor(
    private router: Router,
    private originInitService: OriginInitService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.user.userId || 0;
    this.initForm();

    this.originInitService
      .getWorldCoordinate()
      .subscribe((worldCoordinateRes) => {
        const worldCoordinate: number[] = worldCoordinateRes['body'];
        this.originInitService
          .getAllRange(worldCoordinate)
          .subscribe((result) => {
            const allRange = result['body'];
            this.xMin = allRange[0];
            this.xMax = allRange[1];
            this.yMin = allRange[2];
            this.yMax = allRange[3];
            this.zMin = allRange[4];
            this.zMax = allRange[5];
          });
      });
  }

  initForm() {
    this.moveForm = new FormGroup({
      angleStep: new FormControl(this.angleStep),
      xStep: new FormControl(this.xStep),
      yStep: new FormControl(this.yStep),
      zStep: new FormControl(this.zStep),
      uStep: new FormControl(this.uStep),
      vStep: new FormControl(this.vStep),
      wStep: new FormControl(this.wStep),
    });
  }

  backToOrigin() {
    let initPositionArr = [0, 0, 0, 0, 0, 0],
      worldCoordinateArr = [0, 0, 0, 0, 0, 0];
    this.originInitService
      .getInitPosition(this.userId)
      .subscribe((initPositionRes) => {
        const initPosition = initPositionRes['body'];
        initPositionArr[0] = initPosition['xPosition'];
        initPositionArr[1] = initPosition['yPosition'];
        initPositionArr[2] = initPosition['zPosition'];
        initPositionArr[3] = initPosition['uPosition'];
        initPositionArr[4] = initPosition['vPosition'];
        initPositionArr[5] = initPosition['wPosition'];

        this.originInitService
          .getWorldCoordinate()
          .subscribe((worldCoordinateRes) => {
            const worldCoordinate = worldCoordinateRes['body']['queryData'];
            worldCoordinateArr[0] = Number.parseFloat(worldCoordinate[0]);
            worldCoordinateArr[1] = Number.parseFloat(worldCoordinate[1]);
            worldCoordinateArr[2] = Number.parseFloat(worldCoordinate[2]);
            worldCoordinateArr[3] = Number.parseFloat(worldCoordinate[3]);
            worldCoordinateArr[4] = Number.parseFloat(worldCoordinate[4]);
            worldCoordinateArr[5] = Number.parseFloat(worldCoordinate[5]);

            let dialogRef = this.dialog.open(DialogComponent, {
              data: {
                title: '回到原点',
                content:
                  '请注意!!机械臂末端即将移动X,Y,Z,U,V,W分别为:' +
                  String(
                    (initPositionArr[0] - worldCoordinateArr[0]).toFixed(2)
                  ) +
                  'mm,' +
                  String(
                    (initPositionArr[1] - worldCoordinateArr[1]).toFixed(2)
                  ) +
                  'mm,' +
                  String(
                    (initPositionArr[2] - worldCoordinateArr[2]).toFixed(2)
                  ) +
                  'mm,' +
                  String(
                    (initPositionArr[3] - worldCoordinateArr[3]).toFixed(2)
                  ) +
                  '°,' +
                  String(
                    (initPositionArr[4] - worldCoordinateArr[4]).toFixed(2)
                  ) +
                  '°,' +
                  String(
                    (initPositionArr[5] - worldCoordinateArr[5]).toFixed(2)
                  ) +
                  '°,' +
                  '是否回到上次初始化原点?',
              },
            });

            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                this.originInitService
                  .resetCenter(this.userId)
                  .subscribe((finishInitRes) => {
                    const initPosition = finishInitRes['body'];
                    if (initPosition['anglePosition'] !== 0) {
                      this.angleStep = initPosition['anglePosition'];
                      this.isResetAngle = false;
                    }
                  });
              }

              setTimeout(() => {
                this.originInitService
                  .getWorldCoordinate()
                  .subscribe((worldCoordinateRes) => {
                    const worldCoordinate: number[] =
                      worldCoordinateRes['body'];
                    this.originInitService
                      .getAllRange(worldCoordinate)
                      .subscribe((allRangeRes) => {
                        const allRange = allRangeRes['body'];
                        this.xMin = allRange[0];
                        this.xMax = allRange[1];
                        this.yMin = allRange[2];
                        this.yMax = allRange[3];
                        this.zMin = allRange[4];
                        this.zMax = allRange[5];
                      });
                  });
              }, 2000);
            });
          });
      });
  }

  resetAngle() {
    this.originInitService.resetAngle().subscribe(() => {
      this.angleStep = 0.0;
      this.isResetAngle = !this.isResetAngle;
      setTimeout(() => {
        this.originInitService
          .getWorldCoordinate()
          .subscribe((worldCoordinateRes) => {
            const worldCoordinate: number[] = worldCoordinateRes['body'];
            this.originInitService
              .getAllRange(worldCoordinate)
              .subscribe((allRangeRes) => {
                const allRange = allRangeRes['body'];
                this.xMin = allRange[0];
                this.xMax = allRange[1];
                this.yMin = allRange[2];
                this.yMax = allRange[3];
                this.zMin = allRange[4];
                this.zMax = allRange[5];
              });
          });
      }, 2000);
    });
  }

  move(axis: string, step: number) {
    let movePosition = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    const axisMap: Map<string, number> = new Map([
      ['x', 0],
      ['y', 1],
      ['z', 2],
      ['u', 3],
      ['v', 4],
      ['w', 5],
      ['angle', 5],
    ]);
    movePosition[axisMap.get(axis) || 0] = step;
    this.originInitService
      .getWorldCoordinate()
      .subscribe((worldCoordinateRes) => {
        const worldCoordinate = worldCoordinateRes['body'];
        movePosition[0] += worldCoordinate[0];
        movePosition[1] += worldCoordinate[1];
        movePosition[2] += worldCoordinate[2];
        movePosition[3] += worldCoordinate[3];
        movePosition[4] += worldCoordinate[4];
        movePosition[5] += worldCoordinate[5];

        this.originInitService
          .setWorldCoordinate(movePosition)
          .subscribe(() => {
            setTimeout(() => {
              this.originInitService
                .getWorldCoordinate()
                .subscribe((worldCoordinateRes) => {
                  const worldCoordinate: number[] = worldCoordinateRes['body'];
                  this.originInitService
                    .getAllRange(worldCoordinate)
                    .subscribe((allRangeRes) => {
                      const allRange = allRangeRes['body'];
                      this.xMin = allRange[0];
                      this.xMax = allRange[1];
                      this.yMin = allRange[2];
                      this.yMax = allRange[3];
                      this.zMin = allRange[4];
                      this.zMax = allRange[5];
                    });
                });
            }, 2000);

            if (axis === 'angle') {
              this.isResetAngle = !this.isResetAngle;
            }
          });
      });
  }

  initialize() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '完成初始化',
        content: '是否完成初始化并跳转到任务设置界面？',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.originInitService
          .finishInit(this.userId, this.isResetAngle ? 0 : this.angleStep)
          .subscribe();
        this.router.navigate(['/home/task-set']);
      }
    });
  }
}
