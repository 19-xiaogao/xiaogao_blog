import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
export const hash = bcrypt.hashSync("xiaogao2020", salt);
export const SSHKEY = "webServer@)@)!@@&SSHKEY";
