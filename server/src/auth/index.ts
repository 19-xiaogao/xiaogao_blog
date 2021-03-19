import bcrypt from "bcrypt";
import { personal } from '../types/index'

const salt = bcrypt.genSaltSync(10);

export const hash = bcrypt.hashSync("xiaogao2020", salt);

export const SSHKEY = "webServer@)@)!@@&SSHKEY";

export const personalInformation: personal = {
    name: '小膏',
    email_user: 'longjiuwei999@163.com',
    email_pass: 'AQVGRABRVTQZDHFO'
}
