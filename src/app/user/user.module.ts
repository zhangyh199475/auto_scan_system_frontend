/*
 * @Author: Alex Zhang zhangyh_upc@qq.com
 * @Date: 2023-07-20 15:21:39
 * @LastEditors: Alex Zhang zhangyh_upc@qq.com
 * @LastEditTime: 2023-08-30 14:41:30
 * @FilePath: \auto_scan_system_frontend\src\app\user\user.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class User {
    public userId?: number;
    public userName?: string;
    public password?: string;
    public roleId?: number;
    public active?: number;
    public email?: string;
    public createdDate?: Date;
    public createdBy?: string;
    public expTime?: Date;
}

export class FunctionMapping {
    public userMapping?: boolean;
}
