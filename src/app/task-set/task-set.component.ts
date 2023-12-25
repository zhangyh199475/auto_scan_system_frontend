/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:21:34
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-12-22 17:43:37
 * @FilePath: \auto_scan_system_frontend\src\app\task-set\task-set.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user/user.module';
import { OriginInitService } from '../origin-init/origin-init.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-task-set',
  templateUrl: './task-set.component.html',
  styleUrls: ['./task-set.component.css'],
})
export class TaskSetComponent implements OnInit {
  public user!: User;
  public userId = 0;
  public userName = '';
  public isNotReady = false;

  public setForm!: FormGroup;
  public scanSurface: string = 'xOy';
  public sPara: string = 'S12';
  public scanTime: number = 1;
  public aAxis: string = '坐标X';
  public aMin: number = -100;
  public aMax: number = 100;
  public aStep: number = 10;
  public bAxis: string = '坐标Y';
  public bMin: number = -100;
  public bMax: number = 100;
  public bStep: number = 10;
  public freqMin: number = 0.1;
  public freqMax: number = 1.0;
  public freqStep: number = 0.1;
  public saveFile: string = '';
  public saveRoot = 'D:\\ExperimentalResult\\';
  public savePath: string = '';
  public sendEmail: string = '';

  public xMin: number = 0.0;
  public xMax: number = 0.0;
  public yMin: number = 0.0;
  public yMax: number = 0.0;
  public zMin: number = 0.0;
  public zMax: number = 0.0;
  public aMinRange: number = 0.0;
  public aMaxRange: number = 0.0;
  public bMinRange: number = 0.0;
  public bMaxRange: number = 0.0;

  public totalTime = 0;
  public leftTime = 0;
  public leftTimeHour = this.leftTime / 60 / 60;
  public leftTimeMinute = (this.leftTime - this.leftTimeHour * 3600) / 60;
  public leftTimeSecond =
    this.leftTime - this.leftTimeHour * 3600 - this.leftTimeMinute * 60;

  public mode = 1;
  public state = '已准备';
  public process = 0.0;
  public movePoints: number[][] = [];
  public angle = 0.0;
  public radian = Math.PI / 180.0;
  public worldCoordinate = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  constructor(
    private originInitService: OriginInitService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.sendEmail = this.user.email || '';
    this.userId = this.user.userId || 0;
    this.userName = this.user.userName || 'Default';
    this.saveRoot += this.userName + '\\';
    this.savePath = this.saveRoot;

    this.initForm();
    this.originInitService.getWorldCoordinate().subscribe((res) => {
      this.worldCoordinate = res['body'];

      this.originInitService
        .getAllRange(this.worldCoordinate)
        .subscribe((allRangeRes) => {
          const allRange = allRangeRes['body'];
          this.xMin = allRange[0];
          this.xMax = allRange[1];
          this.yMin = allRange[2];
          this.yMax = allRange[3];
          this.zMin = allRange[4];
          this.zMax = allRange[5];
          this.onChangeScanSurface();
        });
    });
  }

  initForm() {
    this.setForm = new FormGroup({
      scanSurface: new FormControl(this.scanSurface),
      sPara: new FormControl(this.sPara),
      scanTime: new FormControl(this.scanTime),
      aMin: new FormControl(this.aMin),
      aMax: new FormControl(this.aMax),
      aStep: new FormControl(this.aStep),
      bMin: new FormControl(this.bMin),
      bMax: new FormControl(this.bMax),
      bStep: new FormControl(this.bStep),
      freqMin: new FormControl(this.freqMin),
      freqMax: new FormControl(this.freqMax),
      freqStep: new FormControl(this.freqStep),
      saveFile: new FormControl(this.saveFile),
      sendEmail: new FormControl(this.sendEmail),
      savePath: new FormControl(this.savePath),
    });
  }

  onFileNameChange() {
    this.savePath = this.saveRoot + this.saveFile;
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
                  .subscribe(() => {});
              }

              setTimeout(() => {
                this.originInitService
                  .getWorldCoordinate()
                  .subscribe((worldCoordinateRes) => {
                    this.worldCoordinate = worldCoordinateRes['body'];
                    this.originInitService
                      .getAllRange(this.worldCoordinate)
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

  onCheck() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '预检',
        content: '是否开始预检？',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMovePoints(true);

        !(async () => {
          await this.movePointArray(this.movePoints);
          console.log('Done');
        })();

        // for (let element of this.movePoints) {
        //   console.log(element);
        //   console.log('Starting, will sleep for 5 secs now');

        //   setTimeout(function () {
        //     console.log('Normal code execution continues now');
        //   }, 5000);
        // }
        // this.movePoints.forEach((element) => {
        //   console.log(element);

        //   // this.originInitService
        //   //   .setWorldCoordinate(element)
        //   //   .subscribe((setRes) => {
        //   //     const res = setRes['body'];
        //   //     console.log(res);

        //   //     while(1) {
        //   //       let moveState = 1;
        //   //       this.originInitService.getMoveState().subscribe(result => {
        //   //         const queryData = result['body']['queryData'];
        //   //         moveState = Number.parseInt(queryData);
        //   //         console.log(moveState);

        //   //       });
        //   //       if (!moveState) {
        //   //         break;
        //   //       }
        //   //     }
        //   //   });
        //   console.log('Starting, will sleep for 5 secs now');
        //   // await delay(500000);
        //   this.sleep(50000);
        // });
        console.log('Done');
      }
    });
  }

  onScan() {}

  onChangeScanSurface() {
    if (this.scanSurface === 'xOy') {
      this.aMinRange = this.xMin;
      this.aMaxRange = this.xMax;
      this.bMinRange = this.yMin;
      this.bMaxRange = this.yMax;
    } else if (this.scanSurface === 'xOz') {
      this.aMinRange = this.xMin;
      this.aMaxRange = this.xMax;
      this.bMinRange = this.zMin;
      this.bMaxRange = this.zMax;
    } else {
      this.aMinRange = this.yMin;
      this.aMaxRange = this.yMax;
      this.bMinRange = this.zMin;
      this.bMaxRange = this.zMax;
    }
  }

  // 获取移动点位集，scanMode：预检模式为true，扫描模式为false
  getMovePoints(scanMode: boolean) {
    this.originInitService
      .getInitPosition(this.userId)
      .subscribe((initPositionRes) => {
        const initPosition = initPositionRes['body'];
        this.angle = initPosition['anglePosition'];
      });

    this.movePoints = [];
    const stepNumA = (this.aMax - this.aMin) / this.aStep + 1;
    const stepNumB = (this.bMax - this.bMin) / this.bStep + 1;
    const modeIndexA = new Map([
      ['xOy', 0],
      ['xOz', 0],
      ['yOz', 1],
    ]);
    const modeIndexB = new Map([
      ['xOy', 1],
      ['xOz', 2],
      ['yOz', 2],
    ]);
    if (scanMode) {
      const pointBias = [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ];
      pointBias.forEach((element) => {
        let point = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        point[modeIndexA.get(this.scanSurface) || 0] +=
          this.aMin + this.aStep * stepNumA * element[0];
        point[modeIndexB.get(this.scanSurface) || 0] +=
          this.bMin + this.bStep * stepNumB * element[1];
        // 旋转角度
        const xPosition = point[0];
        const yPosition = point[1];
        point[0] =
          xPosition * Math.cos(this.radian * this.angle) -
          yPosition * Math.sin(this.radian * this.angle);
        point[1] =
          xPosition * Math.sin(this.radian * this.angle) +
          yPosition * Math.cos(this.radian * this.angle);
        this.movePoints.push(point);
      });
    } else {
      for (let i = 0; i < stepNumA; i++) {
        for (let j = 0; j < stepNumB; j++) {
          let point = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
          point[modeIndexA.get(this.scanSurface) || 0] +=
            this.aMin + this.aStep * i;
          point[modeIndexB.get(this.scanSurface) || 0] +=
            this.bMin + this.bStep * j;
          // 旋转角度
          const xPosition = point[0];
          const yPosition = point[1];
          point[0] =
            xPosition * Math.cos(this.radian * this.angle) -
            yPosition * Math.sin(this.radian * this.angle);
          point[1] =
            xPosition * Math.sin(this.radian * this.angle) +
            yPosition * Math.cos(this.radian * this.angle);
          this.movePoints.push(point);
        }
      }
    }
    console.log(this.movePoints);
  }

  sleep = (num: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('继续');
        resolve(num);
      }, num);
    });
  };

  movePointArray = async (movePoints: number[][]) => {
    for (let index = 0; index < movePoints.length; index++) {
      console.log(movePoints[index]);
      console.log('开始移动,之后睡眠0.5秒');
      this.originInitService
        .getWorldCoordinate()
        .subscribe((worldCoordinateRes) => {
          const worldCoordinate = worldCoordinateRes['body'];
          const toPosition = movePoints[index];
          toPosition[0] += worldCoordinate[0];
          toPosition[1] += worldCoordinate[1];
          toPosition[2] += worldCoordinate[2];
          toPosition[3] += worldCoordinate[3];
          toPosition[4] += worldCoordinate[4];
          toPosition[5] += worldCoordinate[5];

          this.originInitService
            .setWorldCoordinate(toPosition)
            .subscribe(async (setRes) => {
              const res = setRes['body'];
              let num = 0;
              while (5 !== num) {
                num++;
                const moveState = this.getMoveState();
                console.log(num);
                if ((await moveState) == 1) {
                  console.log('结束移动');
                  break;
                }
              }
            });
        });
      await this.sleep(500);
    }
  };

  getMoveState = async () => {
    let moveState = 0;
    this.originInitService.getMoveState().subscribe(async (result) => {
      console.log(result);

      const queryData = result['body']['queryData'];
      moveState = Number.parseInt(queryData[0]);
      console.log(moveState);

      await this.sleep(100);
    });
    return moveState;
  };
}
