import { IRouters } from '../types/routerType'
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
const router: IRouters[] = [
    {
        path: '/', title: '标题',
        icon: AppstoreOutlined,
    },
    {
        path: '/a', title: '标题2',
        icon: MailOutlined
    },
    {
        path: '/b', title: '标题3',
        icon: SettingOutlined
    }
]

export default router