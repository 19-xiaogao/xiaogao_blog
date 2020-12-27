import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { ApartmentOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./index.scss";

const Header: React.FC = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear()
    history.push("/login");
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );
  return (
    <div className="home_header">
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button type="primary" shape="round" icon={<ApartmentOutlined />} />
      </Dropdown>
    </div>
  );
};
export default Header;
