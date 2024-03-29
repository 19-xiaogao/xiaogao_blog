import express from "express";
import { v4 as uuidv4 } from "uuid";

import {
  createComment,
  getBlogComment,
} from "../../service/web/commentService";
import {
  InsertVerifyCode,
  VerifyServer,
} from "../../service/web/verifyService";
import {
  selectBlog,
  selectBlogDetail,
  blogGoodLike,
  blogCategorize,
} from "../../service/web/blogService";
import {
  selectSubscribeBlog,
  insetSubscribe,
} from "../../service/web/subscribeBlogService";

import { personalInformation } from "../../auth/index";

import nodeEmail from "../../utils/nodemailer";
import { createSixNumber } from "../../utils/util";
import { writeResult } from "../../utils/result";

import { subscribeBlog, IVerify, IComment } from "../../types/index";
import { ResponseState } from "../../types/enum";

const router = express.Router();

// 获取博客列表
router.get("/list_blog", (req, res) => {
  selectBlog(
    req.query,
    (result) => {
      res.writeHead(200, { "Content-Type": ResponseState.ContentType });
      res.write(
        writeResult({
          success: true,
          message: ResponseState.success,
          data: result,
        })
      );
      res.end();
    },
    (error) => {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: error,
        })
      );
      res.send();
    }
  );
});

// 获取博客详情
router.get("/blog_detail", (req, res) => {
  selectBlogDetail(
    req.query,
    (result) => {
      res.writeHead(200, { "Content-Type": ResponseState.ContentType });
      res.write(
        writeResult({
          success: true,
          message: ResponseState.success,
          data: result,
        })
      );
      res.end();
    },
    (error) => {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: error,
        })
      );
      res.send();
    }
  );
});

// 点赞喜欢
router.post("/blog_goodLike", (req, res) => {
  blogGoodLike(
    req.body,
    (result) => {
      res.writeHead(200, { "Content-Type": ResponseState.ContentType });
      res.write(
        writeResult({ success: true, message: ResponseState.success, data: "" })
      );
      res.end();
    },
    (error) => {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: error,
        })
      );
      res.send();
    }
  );
});

//  创建评论
router.post("/blog_createComment", (req, res) => {
  createComment(
    req.body,
    (result) => {
      res.writeHead(200, { "Content-Type": ResponseState.ContentType });
      res.write(
        writeResult({ success: true, message: ResponseState.success, data: "" })
      );
      res.end();
    },
    (error) => {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: error,
        })
      );
      res.send();
    }
  );
});

// 获取博客文章 按年份分类
router.get("/blog_categorize", (req, res) => {
  blogCategorize(
    req.query,
    (result) => {
      res.writeHead(200, { "Content-Type": ResponseState.ContentType });
      res.write(
        writeResult({
          success: true,
          message: ResponseState.success,
          data: result,
        })
      );
      res.end();
    },
    (err) => {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: err,
        })
      );
      res.send();
    }
  );
});

// 发送订阅邮箱
router.post("/subscribe_email", async (req, res) => {
  const { email, type } = req.body;

  res.writeHead(200, { "Content-Type": ResponseState.ContentType });

  try {
    const subscribeResponse = (await selectSubscribeBlog(
      email
    )) as subscribeBlog[];

    if (subscribeResponse.length > 0) {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.success,
          data: "你已经订阅过了",
        })
      );
      res.send();
      return;
    }

    const randomNumber = createSixNumber();

    const url = "http://www.longjiuwei999.com/validation";

    const id = uuidv4();

    const emailResponse = await nodeEmail(
      type,
      { email, url, authNumber: randomNumber, id },
      personalInformation
    );

    const verifyCodeResponse = await InsertVerifyCode({
      authNumber: randomNumber,
      email: email,
      id,
    });

    if (verifyCodeResponse && emailResponse) {
      res.write(
        writeResult({
          success: true,
          message: ResponseState.success,
          data: "邮箱发送成功,请注意查收。",
        })
      );
      res.end();
    } else {
      res.write(
        writeResult({
          success: false,
          message: ResponseState.failed,
          data: "失败.",
        })
      );
      res.send();
    }
  } catch (error) {
    res.write(
      writeResult({
        success: false,
        message: ResponseState.failed,
        data: "服务器错误.",
      })
    );
    res.send();
  }
});

// 邮箱验证
router.post("/subscribe_verify", async (req, res) => {
  const { VerificationCode, id, email } = req.body as IVerify;

  res.writeHead(200, { "Content-Type": ResponseState.ContentType });

  const verifyResponse = (await VerifyServer({
    VerificationCode,
    id,
    email,
  })) as IVerify[];

  if (verifyResponse.length === 0) {
    res.write(
      writeResult({
        success: false,
        message: ResponseState.failed,
        data: "验证码错误",
      })
    );
    res.send();
    return;
  }

  const insetResponse = await insetSubscribe({ email, createTime: new Date() });

  if (insetResponse) {
    res.write(
      writeResult({
        success: true,
        message: ResponseState.success,
        data: "订阅成功",
      })
    );
    res.end();
  } else {
    res.write(
      writeResult({
        success: false,
        message: ResponseState.failed,
        data: "验证失败",
      })
    );
    res.send();
  }
});

router.get("/blog_comment", async (req, res) => {
  res.writeHead(200, { "Content-Type": ResponseState.ContentType });
  try {
    const response = await getBlogComment(req.query as any);
    res.write(
      writeResult({
        success: true,
        message: ResponseState.success,
        data: { list: response.list.reverse(), total: response.total },
      })
    );
    res.send();
  } catch (error) {
    res.write(
      writeResult({
        success: false,
        message: ResponseState.failed,
        data: error,
      })
    );
    res.send();
  }
});

export default router;
