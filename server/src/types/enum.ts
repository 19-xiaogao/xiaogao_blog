export enum ResponseState {
  success = "成功",
  failed = "失败",
  ContentType = 'text/plain;charset=utf-8'
}
export enum EmailType {
  ["订阅验证"] = 1,
  "订阅通知",
  "评论通知"
}