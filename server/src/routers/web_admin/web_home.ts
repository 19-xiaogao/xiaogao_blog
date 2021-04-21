import { Router } from "express";
import { performSql } from "../../db/performSql";
import { writeResult } from "../../utils/result";
import { ResponseState } from "../../types/enum";
const router = Router();

interface IInsetParams {
  bg_url: string; // 背景图片
  headerLogo: string; // 头像logo
  name: string; // 姓名
  recordNumber: string; //备案号
}
// 更新web_home 图片 配置
router.post("/inset", async (req, res) => {
  const insetParams = req.body as IInsetParams;
  const sqlStr =
    // union 合并两个sql语句的集合
    "DELETE * FROM web_home union inset into home_web(bg_url,headerLogo,name,recordNumber) values(?,?,?,?);";
  res.writeHead(200, { "Content-Type": ResponseState.ContentType });
  try {
    await performSql(sqlStr, insetParams);
    res.write(
      writeResult({ success: true, message: ResponseState.success, data: "" })
    );
    res.send();
  } catch (error) {
    writeResult({ success: false, message: ResponseState.failed, data: error });
    res.send();
  }
});

export default router;
