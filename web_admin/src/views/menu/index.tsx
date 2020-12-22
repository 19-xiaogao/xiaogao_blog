import React from "react";
import { Menu } from "antd";
import router from "../../router";
import { IRouters } from "../../types/routerType";
import "./index.scss";
const { Item } = Menu;
export default class ToolsMenu extends React.Component {
  private renderTools = (data: IRouters[]) => {
    return data.map((item) => <Item key={item.path}>{item.title}</Item>);
  };

  public render() {
    return (
      <Menu className="menu_box" mode="inline">
        {this.renderTools(router)}
      </Menu>
    );
  }
}
