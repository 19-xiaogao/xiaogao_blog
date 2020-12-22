import React from "react";
export interface IRouters {
  path: string;
  title: string;
  icon: () => JSX.Element;
}
