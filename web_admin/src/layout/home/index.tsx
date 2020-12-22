import React from "react";
import "./index.scss";
import Box from "../../components/Box";
import Menu from "../../views/menu/index";
export default class Home extends React.Component {
  render() {
    return (
      <Box>
        <Box.Header>头部</Box.Header>
        <Box.Tools>
          <Box.ToolsLogo>XiaoGao博客</Box.ToolsLogo>
          <Menu />
        </Box.Tools>
        <Box.Body>内容展示区域</Box.Body>
      </Box>
    );
  }
}
