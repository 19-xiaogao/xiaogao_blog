import React from "react";
import { RouteComponentProps } from 'react-router-dom'
import "./index.scss";
import Box from "../../components/Box";
import Menu from "../../views/menu/index";
import HeaderTiTile from "../../views/Header";
import { Helmet } from "react-helmet";

import Body from "../body";
import image from "../../assets/image/bg.png";

export default class Home extends React.Component<RouteComponentProps, {}> {

  render() {
    return (
      <Box>
        <Helmet>
          <title>首页</title>
          <link rel="canonical" href={image} />
        </Helmet>
        <Box.Header>
          <HeaderTiTile />
        </Box.Header>
        <Box.Tools>
          <Box.ToolsLogo>XiaoGao博客</Box.ToolsLogo>
          <Menu />
        </Box.Tools>
        <Box.Body>
          <Body />
        </Box.Body>
      </Box>
    );
  }
}
