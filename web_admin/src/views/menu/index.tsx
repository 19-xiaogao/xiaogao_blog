import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import router from "../../router/index";
import { IRouters } from "../../types/routerType";
import "./index.scss";
const { Item } = Menu;
export default class ToolsMenu extends React.Component {
  private renderTools = (data: IRouters[]) => {
    return data.map((item) => (
      <Item key={item.path} icon={item.icon()}>
        <Link to={item.path}>{item.title}</Link>
      </Item>
    ));
  };
  public render() {
    return (
      <Menu className="menu_box" mode="inline">
        {this.renderTools(router)}
      </Menu>
    );
  }
}
