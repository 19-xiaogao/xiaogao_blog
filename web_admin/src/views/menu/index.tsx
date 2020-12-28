import React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Menu } from "antd";
import { Link } from "react-router-dom";
import router from "../../router/index";
import { IRouters } from "../../types/routerType";
import "./index.scss";
const { Item } = Menu;
class ToolsMenu extends React.Component<RouteComponentProps, {}>{
  private renderTools = (data: IRouters[]) => {
    return data.map((item) => (
      <Item key={item.path} icon={item.icon()} >
        <Link to={item.path}>{item.title}</Link>
      </Item>
    ));
  };
  public render() {
    const path = this.props.history.location.pathname
    return (
      <Menu className="menu_box" mode="inline" defaultSelectedKeys={[path]}>
        { this.renderTools(router)}
      </Menu >
    );
  }
}
export default withRouter(ToolsMenu)