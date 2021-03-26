import { IRouters } from "../types/routerType";
import CreatArticle from "../views/creatArticle";
import BlogList from '../views/blogList'
import FistScreen from '../views/fistScreen'
import CommentList from '../views/comment'
import {
  CoffeeOutlined,
  AppleOutlined,
  FundProjectionScreenOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

const router: IRouters[] = [
  {
    path: '/',
    title: "首页",
    components: () => <FistScreen />,
    icon: () => <FundProjectionScreenOutlined />
  },
  {
    path: '/articleList',
    title: "文章列表",
    components: () => <BlogList />,
    icon: () => <UnorderedListOutlined />,
  },
  {
    path: '/creatArticle',
    title: "创建文章",
    components: () => <CreatArticle />,
    icon: () => <CoffeeOutlined />,
  },
  {
    path: '/commentReply',
    title: "评论回复",
    components: () => <CommentList />,
    icon: () => <AppleOutlined />,
  },
];

export default router;
