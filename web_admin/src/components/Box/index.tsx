import React from "react";
import Styles from "./index.module.css";

interface BoxProps {
  children: React.ReactNode;
}

export default class Box extends React.Component<BoxProps, {}> {
  public static Header = (props: any) => (
    <div className={Styles.header}>{props.children}</div>
  );

  public static ToolsLogo = (props: any) => (
    <div className={Styles.tools_logo}>{props.children}</div>
  );

  public static Tools = (props: any) => (
    <div className={Styles.tools}>{props.children}</div>
  );

  public static Body = (props: any) => (
    <div className={Styles.body}>{props.children}</div>
  );

  render() {
    return <div className={Styles.box}>{this.props.children}</div>;
  }
}
