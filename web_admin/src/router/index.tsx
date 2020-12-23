import { IRouters } from "../types/routerType";
import routerPath from "./pathenum";
import CreatArticle from "../views/creatArticle";
import BlogList from '../views/blogList'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const router: IRouters[] = [
  {
    path: routerPath.articleList,
    title: "文章列表",
    components: () => <BlogList />,
    icon: () => <AppstoreOutlined />,
  },
  {
    path: routerPath.creatArticle,
    title: "创建文章",
    components: () => <CreatArticle />,
    icon: () => <MailOutlined />,
  },
  {
    path: routerPath.commentReply,
    title: "评论回复",
    components: () => <CreatArticle />,
    icon: () => <SettingOutlined />,
  },
];

export default router;
