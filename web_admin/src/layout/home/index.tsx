import React from "react";
import "./index.scss";
import Box from "../../components/Box";
import Menu from "../../views/menu/index";
import HeaderTiTile from "../../views/Header";
import { Helmet } from "react-helmet";
export default class Home extends React.Component {
  render() {
    return (
      <Box>
        <Helmet>
          <title>首页</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Box.Header>
          <HeaderTiTile />
        </Box.Header>
        <Box.Tools>
          <Box.ToolsLogo>XiaoGao博客</Box.ToolsLogo>
          <Menu />
        </Box.Tools>
        <Box.Body>内容展示区域</Box.Body>
      </Box>
    );
  }
}
