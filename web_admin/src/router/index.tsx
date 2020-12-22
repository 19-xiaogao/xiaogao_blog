import { IRouters } from "../types/routerType";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const router: IRouters[] = [
  {
    path: "/",
    title: "文章列表",
    icon: (): JSX.Element => <AppstoreOutlined />,
  },
  {
    path: "/a",
    title: "创建文章",
    icon: (): JSX.Element => <MailOutlined />,
  },
  {
    path: "/b",
    title: "评论回复",
    icon: (): JSX.Element => <SettingOutlined />,
  },
];

export default router;
