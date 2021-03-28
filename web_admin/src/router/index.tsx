import CreatArticle from "../views/creatArticle";
import BlogList from '../views/blogList'
import FistScreen from '../views/fistScreen'
import CommentList from '../views/comment'
import Subscribe from '../views/subscribe'

import { IRouters } from "../types/routerType";

import {
  CoffeeOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined
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
    path: '/commentReply',
    title: "评论回复",
    components: () => <CommentList />,
    icon: () => <CommentOutlined />,
  },
  {
    path: '/subscribe',
    title: "订阅列表",
    components: () => <Subscribe />,
    icon: () => <UsergroupAddOutlined />
  },
  {
    path: '/creatArticle',
    title: "创建文章",
    components: () => <CreatArticle />,
    icon: () => <CoffeeOutlined />,
  },
];

export default router;
