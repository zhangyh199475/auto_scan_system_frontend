/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:21:29
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 11:36:10
 * @FilePath: \auto_scan_system_frontend\src\app\task-history\task-history.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class TaskHistory {
  public taskId?: number;
  public userId?: string;
  public type?: string;
  public state?: string;
  public saveFile?: string;
  public sendEmail?: string;
  public anglePosition?: number;
  public xPosition?: number;
  public yPosition?: number;
  public zPosition?: number;
  public uPosition?: number;
  public vPosition?: number;
  public wPosition?: number;
  public scanSurface?: string;
  public sPara?: string;
  public aMin?: number;
  public aMax?: number;
  public aStep?: number;
  public bMin?: number;
  public bMax?: number;
  public bStep?: number;
  public freqMin?: number;
  public freqMax?: number;
  public freqStep?: number;
  public createdTime?: Date;
  public createdBy?: string;
  public finishTime?: Date;
}
